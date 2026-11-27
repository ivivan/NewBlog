export const siteConfig = {
  name: "Ivan",
  // Feature switches. Investing is hidden for now: to bring it back, set `investing: true`
  // and rename src/pages/_investing.astro back to investing.astro.
  features: {
    investing: false,
  },
  title: "Ivan · AI 与投资研究",
  description: "用 AI、数据与可复现研究，记录我对风险、投资和真实世界决策问题的探索。",
  social: {
    github: "https://github.com/ivivan",
    instagram: "https://www.instagram.com/ivivan",
    email: "mailto:ivan@ivivan.com",
  },
};

export const homeContent = {
  title: "且听风吟",
  description:
    "一曲清歌满樽酒，人生何处不相逢",
  // One plain line that says what the site is, under the poetic title.
  tagline: "",
  images: {
    light: "",
    dark: "",
  },
};

// Home "Now" block. Edit by hand; `updated` is shown as the as-of stamp.
export const nowContent = {
  title: "近况",
  updated: "2026-11-25",
  items: [
    { label: "在做", text: "CGTFlow：把券商交易明细变成可审计的澳洲 CGT 工作底稿。" },
    { label: "在写", text: "关于时间加权收益率与模型监控的短篇研究笔记。" },
    { label: "在想", text: "一个能检索自己研究笔记、并给出证据引用的研究助理 Agent。" },
  ],
};

export const aboutContent = {
  meta: {
    title: "关于 - Ivan",
    description: "了解 Ivan 的背景、方法与研究方向",
  },
  title: "我是谁",
  description: `
一个脱离了高级趣味的人，试图在人生的随机选择中寻找意义
`,
  skillGroups: [
    {
      label: "落后的生活方式",
      style: "life",
      items: ["很少刷短视频", "不爱进直播间", "打字用五笔", "新闻订阅用RSS", "短信不带表情"],
    },
    {
      label: "固执的游戏选择",
      style: "life",
      items: ["仁王23", "只狼", "血源诅咒", "匹诺曹的谎言", "埃尔登法环", "最终幻想789"],
    },
    {
      label: "简陋的技术储备",
      style: "life",
      items: ["Logistic Regression", "Random Forest", "LightGBM", "LSTM", "GNN", "Transformer"],
    },
  ],
  image: {
    src: "/assets/images/about/numb.jpg",
    alt: "Profile",
    width: 280,
    height: 100,
  },
  experience: {
    title: "我们在无聊中，而非在消遣中体验时间",
    items: [
      {
        period: "2021 - 至今",
        position: "青铜时代",
        company: "Fraud Detection & Risk Modelling",
        description:
          "受了锤的牛",
      },
      {
        period: "2017 - 2021",
        position: "白银时代",
        company: "CSIRO · UQ",
        description:
          "生活就是个缓慢受锤的过程",
      },
      {
        period: "2004 - 2016",
        position: "黄金时代",
        company: "BUAA · QUT",
        description: "想爱，想吃，还想在一瞬间变成天上半明半暗的云",
      },
    ],
  },
  connect: {
    title: "联系",
    description:
      "这是一个沉默的时代,请发出你的声音",
    email: {
      text: "",
      href: "mailto:ivan@ivivan.com",
    },
  },
};

export const projectsContent = {
  meta: {
    title: "项目 - Ivan",
    description: "AI 与数据系统项目案例",
  },
  title: "项目",
  description: "世界是你们的也是我们的，但归根结底是AI的。在那之前，先让我们用AI来探索世界",
};


// Research note groups. Each note picks exactly one `category` (its id) in frontmatter; tags stay free-form.
// Order here = order on the research page. Changing an id breaks the notes and links that use it.
export const researchCategories = [
  { id: "ai-systems", name: "AI 系统与工程", description: "把模型做成能用的系统：架构、数据管线、评估与上线。" },
  { id: "risk-fraud", name: "风控与反欺诈", description: "风险建模、反欺诈与反洗钱：图数据、特征与可解释性。" },
  { id: "investing", name: "投资与方法", description: "长期投资的研究方法、口径与工具，不构成投资建议。" },
  { id: "essays", name: "随笔", description: "不属于以上任何一类的想法与记录。" },
] as const;

export type ResearchCategoryId = (typeof researchCategories)[number]["id"];
