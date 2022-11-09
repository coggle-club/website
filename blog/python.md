## 环境配置

- 清华大学源：https://pypi.tuna.tsinghua.edu.cn/simple
- 豆瓣源 ：http://pypi.douban.com/simple/
- 腾讯源：http://mirrors.cloud.tencent.com/pypi/simple
- 阿里源：https://mirrors.aliyun.com/pypi/simple/

```
pip install -i http://pypi.douban.com/simple/ --trusted-host=pypi.douban.com/simple ipython
```

## Notebook

- 查看Notebook使用的库和版本

```
import pkg_resources
import types
def get_imports():
    for name, val in globals().items():
        if isinstance(val, types.ModuleType):
            # Split ensures you get root package, 
            # not just imported function
            name = val.__name__.split(".")[0]

        elif isinstance(val, type):
            name = val.__module__.split(".")[0]

        # Some packages are weird and have different
        # imported names vs. system/pip names. Unfortunately,
        # there is no systematic way to get pip names from
        # a package's imported name. You'll have to add
        # exceptions to this list manually!
        poorly_named_packages = {
            "PIL": "Pillow",
            "sklearn": "scikit-learn"
        }
        if name in poorly_named_packages.keys():
            name = poorly_named_packages[name]

        yield name
imports = list(set(get_imports()))

# The only way I found to get the version of the root package
# from only the name of the package is to cross-check the names 
# of installed packages vs. imported packages
requirements = []
for m in pkg_resources.working_set:
    if m.project_name in imports and m.project_name!="pip":
        requirements.append((m.project_name, m.version))

for r in requirements:
    print("{}=={}".format(*r))
```


## 常用第三方库

### 爬虫


| 库名称          | 介绍 |
| :----------------- | :------- |
| [pyppeteer](https://github.com/pyppeteer/pyppeteer)| Unofficial Python port of puppeteer JavaScript (headless) chrome/chromium browser automation library. |
| [psutil](https://github.com/giampaolo/psutil) |  Cross-platform lib for process and system monitoring in Python |
