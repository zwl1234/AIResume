export const resumeTemplate = {
  // 基本信息
  personalInfo: {
    name: '',             // 姓名
    gender: '',           // 性别
    phone: '',            // 联系电话
    email: '',            // 电子邮箱
    university: '',        // 所在大学
    politicalStatus: '',  // 政治面貌
    address: '',          // 地址
    website: '',           // 个人网站
    avatar: ''            // 头像
  },

  // 教育经历
  education: [
    {
      id: 1,              // 唯一标识
      school: '',         // 学校名称
      degree: '',         // 学位
      major: '',          // 专业
      startDate: '',      // 开始时间
      endDate: '',        // 结束时间
      description: ''     // 描述（如成绩、获奖等）
    }
  ],

  // 工作经验
  workExperience: [
    {
      id: 2,              // 唯一标识
      company: '',        // 公司名称
      position: '',       // 职位
      startDate: '',      // 开始时间
      endDate: '',        // 结束时间
      description: ''  // 描述
    }
  ],

  // 技能
  skills: [
    {
      id: 3,              // 唯一标识
      skillName: '',      // 技能名称
      level: ''           // 熟练程度（如初级、中级、高级）
    }
  ],

  // 项目经验
  projects: [
    {
      id: 4,              // 唯一标识
      projectName: '',    // 项目名称
      role: '',           // 担任角色
      startDate: '',      // 开始时间
      endDate: '',        // 结束时间
      description: '',    // 项目描述
      achievements: ''    // 成果
    }
  ],
  // 荣誉奖项
  honors: [
    {
      id: 5,              // 唯一标识
      honorName: '',      // 荣誉名称
      date: '',           // 获奖时间
      description: ''     // 描述
    }
  ],
  // 自我评价
  summary: ''
} as const;
