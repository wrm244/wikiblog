import React from "react";
import { useTrail, animated } from "@react-spring/web";
import Translate from "@docusaurus/Translate";
import { useThemeConfig } from "@docusaurus/theme-common";
import { ThemeConfig } from "@docusaurus/preset-classic";
import Link from "@docusaurus/Link";
import HeroMain from "./img/ai.svg";
import JuejinIcon from "@site/static/svg/juejin.svg";
import { Icon } from "@iconify/react";
import styles from "./styles.module.scss";

/* 桌面下滑箭头 */
function ArrowDownBtn(): JSX.Element {
  return (
    <span className={styles.arrowDownBtnWrapper}>
      <svg
        className={styles.arrowDownBtn}
        aria-hidden="true"
        viewBox="-75.52 -43.52 599.04 599.04"
        fill="currentColor"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
      >
        <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
      </svg>
    </span>
  );
}
function Hero() {
  return (
    <animated.div className={styles.hero}>
      <div className={styles.bloghome__intro}>
        <animated.div className={styles.hero_text}>
          <Translate id="homepage.hero.greet">你好! 我是</Translate>
          <span className={styles.intro__name}>
            <Translate id="homepage.hero.name">河山</Translate>
          </span>
        </animated.div>
        <animated.p>
          <Translate id="homepage.hero.text">
            {`这是一个我用来记录和分享我的学习心得、个人感悟和创意项目的网站。你可以在这里找到我关于编程、设计、人工智能等各种主题的笔记和博客。`}
          </Translate>
          <br />
          <Translate
            id="homepage.hero.look"
            values={{
              note: (
                <Link to="/docs/stack">
                  <Translate id="hompage.hero.note">笔记</Translate>
                </Link>
              ),
              project: (
                <Link to="/project">
                  <Translate id="hompage.hero.project">项目</Translate>
                </Link>
              ),
              link: (
                <Link to="/resource">
                  <Translate id="hompage.hero.link">导航</Translate>
                </Link>
              ),
              idea: (
                <Link to="/tags/">
                  <Translate id="hompage.hero.idea">想法</Translate>
                </Link>
              ),
            }}
          >
            {`你可以随处逛逛与评论，查看{note}、{project}、{link}、以及我的{idea}。`}
          </Translate>
          <br />
          {/* 徽章的效果 */}
          <img
            alt="GitHub last commit"
            src="https://img.shields.io/github/last-commit/wrm244/wrm244.github.io?label=Update"
            style={{
              boxShadow: "0px 16px 30px rgb(62 196 109 / 15%)",
              marginTop: "14px",
            }}
          />{" "}
          <img
            alt="GitHub Workflow Status"
            src="/svg/CI-passing.svg"
            style={{
              boxShadow: "0px 16px 30px rgb(62 196 109 / 15%)",
              marginTop: "14px",
            }}
          ></img>{" "}
          <img
            alt="Netlify Status"
            src="https://api.netlify.com/api/v1/badges/5db8174d-fe3f-4ada-a963-5a52a131788c/deploy-status"
            style={{
              boxShadow: "0px 16px 30px rgb(62 196 119 / 15%)",
              marginTop: "14px",
            }}
          ></img>
        </animated.p>
        <SocialLinks />
        <animated.div>
          <a className={styles.intro} href={"./about/"}>
            <Translate id="hompage.hero.introduce">自我介绍</Translate>
          </a>
          {/*span>　</span> */}
          {/* <a className={styles.intro} href={"https://wrm244.gxist.cn/resume"}> */}
          {/*  <Button isLink href={'https://wrm244.gxist.cn/resume' } target="_blank"> */}
          {/*   <Translate id="hompage.hero.text.resume">个人简历</Translate> */}
          {/*  </Button> */}
          {/* </a> */}
          <span>　</span>
          <a className={styles.intro} href={"/resume/"}>
            {/* <Button isLink href={'https://wrm244.gxist.cn/resume' } target="_blank"> */}
            <Translate id="hompage.hero.text.resume">个人简历</Translate>
            {/* </Button> */}
          </a>
        </animated.div>
      </div>
      <div className={styles.bloghome__image}>
        <HeroMain />
        <ArrowDownBtn />
      </div>
    </animated.div>
  );
}

export function SocialLinks({ ...prop }) {
  const themeConfig = useThemeConfig() as ThemeConfig;

  const socials = themeConfig.socials as {
    github: string;
    twitter: string;
    juejin: string;
    csdn: string;
    qq: string;
    wx: string;
    cloudmusic: string;
    zhihu: string;
  };

  return (
    <animated.div className={styles.social__links} {...prop}>
      <a
        href="/rss.xml"
        target="_blank"
        aria-label="Really Simple Syndication"
        rel="rss"
      >
        <Icon icon="ri:rss-line" />
      </a>
      <a href={socials.github} target="_blank" aria-label="github" rel="github">
        <Icon icon="ri:github-line" />
      </a>
      <a href={socials.juejin} target="_blank" aria-label="juejin" rel="juejin">
        <JuejinIcon />
      </a>
      <a href={socials.qq} target="_blank" aria-label="QQ" rel="QQ">
        <Icon icon="ri:qq-line" />
      </a>
      <a
        href={socials.twitter}
        target="_blank"
        aria-label="email"
        rel="email"
      >
        <Icon icon="ri:mail-line" />
      </a>
      <a href={socials.zhihu} target="_blank" aria-label="zhihu" rel="zhihu">
        <Icon icon="ri:zhihu-line" />
      </a>
    </animated.div>
  );
}

export default Hero;
