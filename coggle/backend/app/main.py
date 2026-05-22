"""FastAPI 主应用入口。"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.api.blog import router as blog_router
from app.api.tutorial import router as tutorial_router
from app.api.competition import router as competition_router
from app.api.link import router as link_router
from app.api.app import router as app_router
from app.api.page import router as page_router
from app.api.search import router as search_router
from app.api.homepage import router as homepage_router
from app.api.model import router as model_router
from app.api.log import router as log_router
from app.core.logger import logger

app = FastAPI(title="Coggle API", version="0.1.0", description="Coggle（Communication For Kaggle）社区数据平台 API")

# CORS 中间件（开发环境开放所有来源）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def access_log_middleware(request, call_next):
    """记录每个 API 请求的方法、路径、来源 IP、浏览器信息和响应状态。"""
    import time
    start = time.time()
    response = await call_next(request)
    duration = int((time.time() - start) * 1000)

    client_host = request.client.host if request.client else "unknown"
    user_agent = request.headers.get("user-agent", "-")
    referer = request.headers.get("referer", "-")

    logger.info(
        "%s %s %d %dms %s %s %s",
        request.method,
        request.url.path,
        response.status_code,
        duration,
        client_host,
        referer,
        user_agent,
    )
    return response


# 注册路由
app.include_router(health_router)
app.include_router(blog_router)
app.include_router(tutorial_router)
app.include_router(competition_router)
app.include_router(link_router)
app.include_router(app_router)
app.include_router(page_router)
app.include_router(search_router)
app.include_router(homepage_router)
app.include_router(model_router)
app.include_router(log_router)
