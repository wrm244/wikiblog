---
id: geekos-project-4
slug: /geekos-project-4
title: geekos project 4
author: RiverMountain  
date: 2023/04/27
tags: [OS]  
keywords: [OS,geekos]
description: 了解虚拟存储器管理设计原理，掌握请求分页虚拟存储管理的具体实现技术
last_update:
  date: 2023/04/27
---

## 项目设计目的

了解虚拟存储器管理设计原理，掌握请求分页虚拟存储管理的具体实现技术。

## 项目设计要求

1. 段式先将逻辑地址映射成线性地址；
2. 页式将线性地址映射成物理地址；
3. 请求分页机制的实现；
4. 创建页目录PGD和页表PT数据结构；
5. 系统全局页链表g_pageList,s_freeList；
6. 初始化页面文件数据结构；
7. 初始化页面文件数据结构；
8. 为页面文件分配与释放磁盘块；
9. 读写页数据函数的实现；
10. 内核缓冲区与用户缓冲区之间的数据交换；
11. 用户级进程在分页系统中的创建，执行与销毁。

## 项目设计原理
为了实现分页存储系统的地址转换机制，系统增如了个新的寄存器CR3作为指向当前页目录的指针。这样,从线性地址到物现地址的映射过程为:  
1. 从CR3取得页目录的基地址；  
2. 以线性地址中的页目录位段为下标，在目录中取得相应页表的基地址；
3. 以线性地址中的页表位段为下标，在所得到的页表中取得相应的页面描述项；  
4. 将页面描述项中给出的页面基地址与线性地址中的页内偏移位段相加得到物理地址。
上述映射过程可用图表示，具体如下图所示:
![线性地址与物理地址的映射](assets/geekos%20project%204/image-20230427124537.png)
![](assets/geekos%20project%204/image-20230427131306.png)


在GeekOS中，所有内核级进程共享一个页表，而每个用户级进程都有各自的页表。当系统需要运行某个进程时，就把该进程对应的页表调入内存，并使之驻留在内存中，这样就可以运行该用户级线程。此外，用户模式进程的页表也包含访问内核模式内存的入口。GeekOS的内存布局如下图所示：
![](assets/geekos%20project%204/image-20230427124656.png)

通过编写一个初始化页表和允许在处理器中使用分页模式的函数来为内核级进程创建一个页目录和页表入口，这个函数就是project4/src/geekos/paging.c中的Init_ VM函数。在paging.c的Init _VM的Hints (提示)中，用户可以看到此函数的功能主要有以下三个：

1. 建立内核页目录表和页表；  
2. 调用Enable_Paging函数使分页机制有效；  
3. 加入一个缺页中断处理程序，并注册其中断号为14。

用户设计的缺页中断处理程序应该能够认识到此页在page file中是存在的，并将其从磁盘读进内存。而当用户将一页从磁盘调入内存时，需要释放这一页占用的空间。

缺页中断处理程序应做的工作如下表所示：
![](assets/geekos%20project%204/image-20230427125124.png)

## 实现
1. 在<src/geekos/paging.c>文件中编写代码完成以下函数：
- Init_VM()(defined in )函数将建立一个初始的内存页目录和页表，并且安装一个页面出错处理程序。
```c title="src/geekos/paging.c"
//通过为内核和物理内存构建页表来初始化虚拟内存。
//其中页目录项和页表项也可以合在一起看作是二级页表
void Init_VM(struct Boot_Info *bootInfo)
{
    int kernel_pde_entries;
    int whole_pages;
    int i, j;
    uint_t mem_addr;
    pte_t *cur_pte;
    // 计算物理内存的页数
    whole_pages = bootInfo->memSizeKB / 4; //2048块
   
    // 计算内核页目录中要多少个目录项，才能完全映射所有的物理内存页。
    
    kernel_pde_entries = whole_pages / NUM_PAGE_DIR_ENTRIES + (whole_pages % NUM_PAGE_DIR_ENTRIES == 0 ? 0 : 1);//看是否有余数 结果为两个目录页
    
    g_kernel_pde = (pde_t *)Alloc_Page();
    KASSERT(g_kernel_pde != NULL);//断言宏，这个函数用来检查g_kernel_pde是否为空指针，如果是，说明内核页目录没有正确分配，程序无法继续运行
    // 将页中所有位清0
    memset(g_kernel_pde, 0, PAGE_SIZE);
    
    pde_t *cur_pde_entry;
    cur_pde_entry = g_kernel_pde;
    mem_addr = 0;
    for (i = 0; i < kernel_pde_entries - 1; i++)
    {
        //这一循环的目的是创建页目录项与页表项，把页目录项指向页表项
        cur_pde_entry->present = 1;
        cur_pde_entry->flags = VM_WRITE;
        cur_pde_entry->globalPage = 1;
        cur_pte = (pte_t *)Alloc_Page();
        KASSERT(cur_pte != NULL);
        // 初始化每一个页目录表项和对应的页表。注意，页表中的页表项不一定足够1024个
        cur_pde_entry->present = 1;
        cur_pde_entry->flags = VM_WRITE;
        cur_pde_entry->globalPage = 1;
        cur_pte = (pte_t *)Alloc_Page();
        KASSERT(cur_pte != NULL);
        memset(cur_pte, 0, PAGE_SIZE);
        cur_pde_entry->pageTableBaseAddr = (uint_t)cur_pte >> 12;
       
        int last_pagetable_num;
        last_pagetable_num = whole_pages % NUM_PAGE_TABLE_ENTRIES;
        // 注意当last_pagetable_num=0时，意味着最后一个页目录项对应的页表是满的，就是说页表中1024个页表项都指向一个有效的页。
        if (last_pagetable_num == 0)
        {
            last_pagetable_num = NUM_PAGE_TABLE_ENTRIES;
        }
        for (j = 0; j < last_pagetable_num; j++)
        {
            cur_pte->present = 1;
            cur_pte->flags = VM_WRITE;
            cur_pte->globalPage = 1;
            cur_pte->pageBaseAddr = mem_addr >> 12;
            cur_pte++;
            mem_addr += PAGE_SIZE;
            // mydebug
            // Print("the mem_addr is %x/n",mem_addr);
        }
        // 从现在开始，系统的寻址必须经过分页机制转换，以前仅仅经过分段机制转换
        Enable_Paging(g_kernel_pde);

        // 加入一个缺页中断处理程序，并注册其中断号为14
        Install_Interrupt_Handler(14, Page_Fault_Handler);
        
    }

}
```

:::tip **对于第40行代码的提示**
假设当前要映射的线性地址是0x80001000，它的最高10位是0x200，中间10位是0x000，最低12位是0x000。那么：

-   cur_pde_entry指向页目录表中的第0x200项，假设它的地址是0xe000。
-   cur_pte指向页表中的第0x000项，假设它的地址是0xf000。
-   pageTableBaseAddr存储了页表所在物理页的基地址，假设它是0x1000。
-   (uint_t)cur_pte >> 12得到了页表所在物理页的页号，它是0xf000 / 4096 = 0x3。

这段代码就是将0x3存储到pageTableBaseAddr中，即：

cur_pde_entry->pageTableBaseAddr = 0x3;

这样，就建立了线性地址0x80001000到物理地址0x300000的一级映射关系。
:::
- Init_Paging()函数(定义在src/geekos/paging.c)初始化操作页面调度文件所需的所有数据结构。就如前面说到的，Get_Paging_Device()函数指定分页调度文件定位在哪一个设备和占用磁盘块的地址范围。
```c title="src/geekos/paging.c"
void Init_Paging(void)
{
    pagingDevice = Get_Paging_Device();
    if (pagingDevice == NULL)
    {
        Print("can not find pagefile/n");
        return;
    }
    numPagingDiskPages = pagingDevice->numSectors / SECTORS_PER_PAGE;
    // 为pagefile中每一页设置标示位
}
```
- Find_Space_On_Paging_File()函数应该在分页调度文件里面找到一个空闲的足够大的页空间。它将返回这个大块的索引，或者当没有合适的空间就返回-1。将释放由Find_Space_On_Paging_File()函数在分页调度文件里所分配的的磁盘块。
```c title="src/geekos/paging.c"
int Find_Space_On_Paging_File(void)
{
    KASSERT(!Interrupts_Enabled());
    return Find_First_Free_Bit(Bitmap, numPagingDiskPages);

}
```
- Write_To_Paging_File()函数将把存储在内存的一页数据写出到分页调度文件里。
```c
void Write_To_Paging_File(void *paddr, ulong_t vaddr, int pagefileIndex)
{
    struct Page *page = Get_Page((ulong_t)paddr);
    KASSERT(!(page->flags & PAGE_PAGEABLE)); /* Page must be locked! */
    KASSERT((page->flags & PAGE_LOCKED));
    // Debug("PageFileIndex: 0 <= %d < %d/n", pagefileIndex, bitmapSize);
    if (0 <= pagefileIndex && pagefileIndex < numPagingDiskPages)
    {
        int i;
        for (i = 0; i < SECTORS_PER_PAGE; i++)
        {
            Block_Write(
                pagingDevice->dev,
                pagefileIndex * SECTORS_PER_PAGE + i + (pagingDevice->startSector),
                paddr + i * SECTOR_SIZE);
        }
        Set_Bit(Bitmap, pagefileIndex);
    }
    else
    {
        Print("Write_To_Paging_File: pagefileIndex out of range!/n");
        Exit(-1);
    }
}
```

- Read_From_Paging_File()函数将读取分页调度文件里的一页数据到内存空间。
```c
void Read_From_Paging_File(void *paddr, ulong_t vaddr, int pagefileIndex)
{
    struct Page *page = Get_Page((ulong_t)paddr);
    KASSERT(!(page->flags & PAGE_PAGEABLE)); /* Page must be locked! */
    page->flags = page->flags & ~PAGE_PAGEABLE;
}
```
2. 在<src/geekos/uservm.c>文件中编写代码完成以下函数(项目三已完成)：

- Destroy_User_Context()释放进程所占用的所有内存和其它资源。

- Load_User_Program()装载可执行文件到内存里，创建一个就绪的用户地址空间，功能类似于分段系统的实现。

- Copy_From_User()从一个用户缓冲区复制数据到一个内核缓冲区。

- Copy_To_User()从一个内核缓冲区复制数据到一个用户缓冲区。

- Switch_To_Address_Space()利用它装载相应页目录和LDT（局部描述符表）来切换到一个用户地址空间。

操作系统将需要在磁盘设备上创建一个page file文件暂时保存从内存中替换出去的页，实现一个类LRU（最近最少使用页面）算法在内存中选取一个替换页把它写到磁盘的page file文件中，然后根据表4.1 缺页处理表进行缺页中断处理。

在“/src/geekos/mem.c”文件中，已经定义了一个函数Alloc_Pageable_Page实现交换一页到磁盘的操作，具体执行步骤如下：

1. 调用mem.c文件中已经实现的Find_Page_To_Page_Out函数来确定要替换的页（这个函数依赖于页数据结构中的clock域）；
```c title="/src/geekos/mem.c"
static struct Page *Find_Page_To_Page_Out()
{
    int i;
    struct Page *curr, *best;
    best = NULL;
    for (i=0; i < s_numPages; i++){
    if ((g_pageList[i].flags & PAGE_PAGEABLE) &&
        (g_pageList[i].flags & PAGE_ALLOCATED)) {
        if (!best) best = &g_pageList[i];
        curr = &g_pageList[i];
        if ((curr->clock < best->clock) && (curr->flags & PAGE_PAGEABLE)) {
        best = curr;
        }
    }
  }
    return best;
}
```
2. 调用paging.c文件中已经实现的Find_Space_On_Paging_File函数在page file中找到空闲的存储空间；

3. 调用paging.c文件中已经实现的Write_To_Paging_File函数把被替换的页写到page file文件中；

4. 修改页表的相应表项，清除页存在的标志，标识为此页在内存为不存在；

5. 修改页表项的页基地址为包含这一页的第一个磁盘块号；

6. 修改页表项的kernelInfo位标识为KINFO_PAGE_ON_DISK状态（标识这一页是在磁盘上存在，而不是没有效）；
7. 调用lowlevel.asm文件中已经实现的Flush_TLB来刷新TLB。

## 运行结果

![](assets/geekos%20project%204/image-20230427125527.png)

当前系统有进程号为1~5的进程正在运行，标号1打印当前页目录表的入口起始地址，标号2打印当前页表当前起始地址，标号3打印当前所在页表位置，标号4打印物理地址起始地址，标号5打印线性地址，再运行一次进程4打印当前线性地址对应物理地址。

:::tip
页表要去内存中取值才能获取实际对应的物理地址。页表基地址字段只是一个指针，它指向页表所在的物理页的起始地址。要访问页表中的具体内容，还需要加上页表项的索引和偏移量。页表中的每个页表项也是一个指针，它指向实际对应的物理页的起始地址。要访问物理页中的具体内容，还需要加上页内偏移量。所以，要通过线性地址来访问物理内存中的数据，需要经过两级的转换，分别是页目录项和页表项。
:::

打印函数如下
```c

/*
 * 分配文件所需要的页
 * 失败返回-1，成功返回0
 *
 */
int Alloc_User_Page(pde_t * pageDir,uint_t startAddress,uint_t sizeInMemory)
{
	uint_t pagedir_index=startAddress>>22;
	uint_t page_index=(startAddress<<10)>>22;//获取线性地址的页表地址

	pde_t * pagedir_entry=pageDir+pagedir_index;
	pte_t * page_entry;
//第一步，建立startAddress对应的页目录表项与页表
//mydebug
 Print("1 IN Alloc_User_Page,pagedir_entry=%x\n", pagedir_entry);

//startAddress对应的页目录表项已经建立的情况
	if(pagedir_entry->present)
	{
		page_entry=(pte_t *)(pagedir_entry->pageTableBaseAddr<<12);//4kb
		Print("2 IN Alloc_User_Page,existed page_entry first=%x\n", page_entry);
//mydebug
//Print("IN Alloc_User_Page,page_entry=%x\n", page_entry);
	}
	else //startAddress对应页目录表项没有建立的情况（此时意味着对应的页表没有建立）
	{
		//分配一个页表
		page_entry=(pte_t*) Alloc_Page();
		if(page_entry==NULL)
		{
			Print("can not allocate page in Alloc_User_Page/n");
			return -1;
		}
		memset(page_entry,0,PAGE_SIZE);
		//设置对应的页目录表项
		*((uint_t*)pagedir_entry)=0;
		pagedir_entry->present=1;
		pagedir_entry->flags=VM_WRITE | VM_READ | VM_USER;
		pagedir_entry->globalPage=0;
		pagedir_entry->pageTableBaseAddr=(ulong_t)page_entry >> 12;
         //page_entry是页表的起始地址！！！
		Print("2 IN Alloc_User_Page,new page_entry first=%x\n", page_entry);
	}

//找到页表中对应于startAddress的页表项
	page_entry+=page_index;//page_entry是页表项起始的物理地址,相加线性地址的页表项才能得到正确的页表项的地址
	Print("3 IN Alloc_User_Page,page_true=%x\n", page_entry);

//第二步，建立startAddress对应的页表项与页
	int num_pages;
	void * page_addr;
//这里算所需页数时，注意要对齐页边界
	num_pages=Round_Up_To_Page(startAddress-Round_Down_To_Page(startAddress)+sizeInMemory)/PAGE_SIZE;
//sizeInMemory为应用需要的内存大小
	int i;
	uint_t first_page_addr=0;
	for(i=0; i<num_pages; i++)
	{
		//对应的页表项没有建立的情况（此时意味着对应的页没有建立）
		if(!page_entry->present)
		{
			page_addr=Alloc_Pageable_Page(page_entry, Round_Down_To_Page(startAddress));
			if(page_addr==NULL)
			{
				Print("can not allocate page in Alloc_User_Page/n");
				return -1;
			}
			//设置页表项
			*((uint_t*)page_entry)=0;
			page_entry->present=1;
			page_entry->flags=VM_WRITE | VM_READ | VM_USER;
			page_entry->globalPage = 0;
			page_entry->pageBaseAddr = (ulong_t)page_addr>>12;
	//将分配的页的物理地址右移12位，相当于除以4096，得到了分配的页的物理页号。
	//page_entry->pageBaseAddr是页表项中的一个字段，它存储了分配的页的物理页号
			KASSERT(page_addr!= 0);
			if(i==0)
			{
				first_page_addr = (uint_t) page_addr;
			}
		
		Print("4 IN Alloc_User_Page,liner addr=%x\n", startAddress);
        Print("5 IN Alloc_User_Page,phical addr=%x\n", page_addr);
        Print("-------------------------------------------\n");
		}
		page_entry++;
		startAddress+=PAGE_SIZE;
	}
	return 0;
}
```

:::tip
例如：第一进程给出的线性地址是`80001000`，转换成二进制后是`1000 0000 0000 0000 0001 0000 0000 0000`，最高10位`1000 0000 00`的十进制是512，中间10位`00 0000 0001`的十进制是1，最低12位`0000 0000 0000`的十进制是0。  
首先，需要从当前页目录表的入口起始地址d800开始，找到第512项，即`d800 + 512 * 4 = e000`。当前页表当前起始地址e000就是第512项的内容，表示页表的物理地址。  
然后，需要从当前页表当前起始地址e000开始，找到第1项，即`e000 + 1 * 4 = e004`。当前所在页表位置e004就是第1项的内容，表示物理页的物理起始地址。  
最后，需要从物理页的物理起始地址f000开始，加上字节偏移量0，即`f000 + 0 = f000`。所以当前线性地址对应的物理地址为f000。
:::

```c title="src/geekos/uservm.c"
int Alloc_User_Page(pde_t * pageDir,uint_t startAddress,uint_t sizeInMemory)
{
    uint_t pagedir_index=startAddress>>22;
    uint_t page_index=(startAddress<<10)>>22;
    pde_t * pagedir_entry=pageDir+pagedir_index;
    pte_t * page_entry;
//第一步，建立startAddress对应的页目录表项与页表
 Print("1 IN Alloc_User_Page,pagedir_entry=%x\n", pagedir_entry);
//startAddress对应的页目录表项已经建立的情况
    if(pagedir_entry->present)
    {
        page_entry=(pte_t *)(pagedir_entry->pageTableBaseAddr<<12);
        Print("2 IN Alloc_User_Page,existed page_entry first=%x\n", page_entry);
    }
    else //startAddress对应页目录表项没有建立的情况（此时意味着对应的页表没有建立）
    {
        //分配一个页表
        page_entry=(pte_t*) Alloc_Page();
        if(page_entry==NULL)
        {
            Print("can not allocate page in Alloc_User_Page/n");
            return -1;
        }
        memset(page_entry,0,PAGE_SIZE);
        //设置对应的页目录表项
        *((uint_t*)pagedir_entry)=0;
        pagedir_entry->present=1;
        pagedir_entry->flags=VM_WRITE | VM_READ | VM_USER;
        pagedir_entry->globalPage=0;
        pagedir_entry->pageTableBaseAddr=(ulong_t)page_entry >> 12;
//mydebug
        Print("2 IN Alloc_User_Page,new page_entry first=%x\n", page_entry);
    }
  
//找到页表中对应于startAddress的页表项
    page_entry+=page_index;
    Print("3 IN Alloc_User_Page,page_entry=%x\n", page_entry);
//第二步，建立startAddress对应的页表项与页
    int num_pages;
    void * page_addr;
//这里算所需页数时，注意要对齐页边界
    num_pages=Round_Up_To_Page(startAddress-Round_Down_To_Page(startAddress)+sizeInMemory)/PAGE_SIZE;
    int i;
    uint_t first_page_addr=0;
    for(i=0; i<num_pages; i++)
    {
        //对应的页表项没有建立的情况（此时意味着对应的页没有建立）
        if(!page_entry->present)
        {
            page_addr=Alloc_Pageable_Page(page_entry, Round_Down_To_Page(startAddress));
            if(page_addr==NULL)
            {
                Print("can not allocate page in Alloc_User_Page/n");
                return -1;
            }
            //设置页表项
            *((uint_t*)page_entry)=0;
            page_entry->present=1;
            page_entry->flags=VM_WRITE | VM_READ | VM_USER;
            page_entry->globalPage = 0;
            page_entry->pageBaseAddr = (ulong_t)page_addr>>12;
            KASSERT(page_addr!= 0);
            if(i==0)
            {
                first_page_addr = (uint_t) page_addr;
            }
//mydebug
        Print("4 IN Alloc_User_Page,phical addr=%x\n", page_addr);
        Print("5 IN Alloc_User_Page,liner addr=%x\n", startAddress);
        }
        page_entry++;
        startAddress+=PAGE_SIZE;
    }
    return 0;
}
```

![](assets/geekos%20project%204/image-20230427125820.png)

输入命令rec 4后，可以得到如上图迭代递归下的 Project4运行截图所示结果。由结果可以看出，当前进程队列下共有7个进程，进程1显示出当前页目录表入口为39ffc，进程2显示已存在页表的入口地址为3e000，进程3显示该线性地址空间下对应查找到的页表下标地址为3eff4，进程4显示对应物理地址为43000，进程5显示当前线性地址为ffffd000；最后输出此次迭代递归的搜索深度为4，在这个过程中一共递归调用过4次进程，分别是调用递归进程4、进程3、进程2，以及进程1，最后结束递归调用，程序运行结束。

## 习题
1. GeekOS 系统原始的内存管理方式是什么？
> 答：基于段式的内存管理。
>GeekOS的存储器管理：
>①分页分配方式：系统中所有存储器都分成大小相等的块，称为页。在X86系统中，页的大小是4KB。
>②堆分配方式：堆分配提供不同大小存储块的分配，使用函数Malloc()和Free()进行存储块的分配和回收。

2. 在GeekOS 系统中，分页系统的地址转换机制是如何实现？ 
>答：分页机制把线性地址空间和物理地址空间分别划分为大小相同的块。这样的块称之为页。通过在线性地址空间的页与物理地址空间的页之间建立的映射，分页机制实现线性地址到物理地址的转换。线性地址空间的页与物理地址空间的页之间的映射可根据需要而确定，可根据需要而改变。线性地址空间的任何一页，可以映射为物理地址空间中的任何一页。采用分页管理机制实现线性地址到物理地址转换映射的主要目的是便于实现虚拟存储器。不像段的大小可变，页的大小是相等并固定的。根据程序的逻辑划分段，而根据实现虚拟存储器的方便划分页。

3. 在GeekOS 系统中，如何为用户级线程创建一级目录表？
>答：线性地址空间的页到物理地址空间的页之间的映射用表来描述。为避免映射表占用巨大的存储器资源，所以把页映射表分为两级。页映射表的第一级称为页目录表，存储在一个4K字节的物理页中。页目录表共有1K个表项，其中，每个表项为4字节长，包含对应第二级表所在物理地址空间页的页码。

4. 在GeekOS 系统中，如何为用户级线程创建二级页表？
> 答：页映射表的第二级称为页表，每张页表也安排在一个4K字节的页中。每张页表都有1K个表项，每个表项为4字节长，包含对应物理地址空间页的页码。由于页目录表和页表均由1K个表项组成，所以使用10位的索引就能指定表项，即用10位的索引值乘以4加基地址就得到了表项的物理地址。

5. 在GeekOS系统中，如何分页存储管理来运行用户级线程？
>答：给每个进程分配一张页表，当要运行该用户线程时，只要将要执行进程的页表调入内存，使它驻留在内存中，就可以运行用户级线程。（其他进程的页表不必驻留在内存中）
>两级表的第一级表称为页目录，存储在一个4K字节的页中，页目录表共有1K个表项，每个表项为4个字节，线性地址最高的10位（22-31）用来产生第一 级表索引，由该索引得到的表项中的内容定位了二级表中的一个表的地址，即下级页表所在的内存块号。第二级表称为页表，存储在一个4K字节页中，它包含了 1K字节的表项，每个表项包含了一个页的物理地址。二级页表由线性地址的中间10位（12-21）位进行索引，定位页表表项，获得页的物理地址。页物理地 址的高20位与线性地址的低12位形成最后的物理地址。
>由于4G的地址空间划分为1M个页，因此，如果用一张表来描述这种映射，那么该映射表就要有1M个表项，若每个表项占用4个字节，那么该映射表就要占用4M字节。为避免映射表占用巨大的存储器资源，所以把页映射表分为两级。

## 参考与致谢
- [GeekOS操作系统Project4_geekos](https://blog.csdn.net/lingjing666/article/details/107383802)