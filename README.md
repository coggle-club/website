## 项目说明

本项目为Coggle数据科学官网内容：https://coggle.club/

## 文章模板

在`.md`文件的开头写入如下信息：

```
<!-- Coggle 30 Days of ML（22年1&2月） -->
<!-- 30天入门数据竞赛 -->
<!-- 2022-01-01 -->
<!-- <a target="_blank" href="https://www.zhihu.com/people/finlayliu">阿水</a>, <a target="_blank" href="https://www.zhihu.com/people/wang-he-13-93">鱼遇雨欲语与余</a>-->
<!-- <a href="https://coggle.club/blog/30days-of-ml-202201">学习资料</a>##<a href="https://shimo.im/forms/vZyk3Pvmc7kvAskG/fill">打卡链接</a> -->
```

分别代表的是：文章标题、文章介绍、文章日期、作者、其他文章链接

参考案例：
- [https://gitee.com/coggle/website/raw/master/blog/30days-of-ml-202201.md](https://gitee.com/coggle/website/raw/master/blog/30days-of-ml-202201.md)
- [https://coggle.club/blog/30days-of-ml-202201](https://coggle.club/blog/30days-of-ml-202201)

## 功能介绍

### Latex公式

文章支持Latex公式，行内公式使用`$ $`，单行公式使用`$$ $$`

### mermaid流程图

文章支持流程图，具体的使用方法可参考在线编辑器，直接插入即可：

[https://mermaid-js.github.io/mermaid-live-editor/](https://mermaid-js.github.io/mermaid-live-editor/)

### B站视频

具体插入的src字段根据具体视频设置，直接当作文本插入。

```
<iframe src="//player.bilibili.com/player.html?aid=763240042&bvid=BV1e64y187CD&cid=412574933&page=1&high_quality=1&danmaku=0&as_wide=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="100%" height="430"> </iframe>
```