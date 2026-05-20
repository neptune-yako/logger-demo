# TypeScript Logger 系统

这是一套基于纯 TypeScript 开发的高可扩展 Logger 日志系统


## 安装与配置

本项目仅需要基础的 TypeScript 环境即可运行。在项目根目录下执行以下命令安装必要依赖：

```bash
# 初始化环境
npm init -y

# 安装 TS 和 Node 类型声明
npm install -D typescript @types/node
```

## 运行示例


在终端中执行以下命令，即可直接运行测试用例并观察控制台输出：

```bash
npx tsx demo.ts
```

## 设计理念

1. **面向接口编程**：核心调度类 `Logger` 仅依赖于抽象的 `ITransport` 接口和 `LogEntry` 数据契约，绝不与具体的输出载体（如终端、文件系统）产生硬编码耦合。

## 如何支持未来扩展

得益于高度解耦的架构，当未来需要接入新的日志存储媒介（例如 HTTP 远程上报、Sentry 服务或钉钉告警）时，操作极为简便：

1. **核心代码零侵入**：原有的 `Logger` 类逻辑、以及业务方的调用代码无需做任何修改
