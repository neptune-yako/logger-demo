// 定义 LogLevel, ITransport, ILogger 等抽象
/** 日志等级 */
export type LogLevel = 'verbose' | 'info' | 'warning' | 'error';

/** 日志等级权重映射 */
export const LogLevelWeight: Record<LogLevel, number> = {
    verbose: 10,
    info: 20,
    warning: 30,
    error: 40,
};

/** 结构化日志条目 */
export interface LogEntry {
    level: LogLevel;
    message: string;
    timestamp: number;
    /** 附加元数据 */
    meta?: Record<string, unknown>;
}

/** 传输器接口 */
export interface ITransport {
    /** 最低日志等级 */
    level: LogLevel;
    /** 写入日志 */
    write(entry: LogEntry): void;
}

/** Logger 核心接口 */
export interface ILogger {
    /** 添加输出传输器 */
    addTransport(transport: ITransport): void;

    verbose(message: string, meta?: Record<string, unknown>): void;
    info(message: string, meta?: Record<string, unknown>): void;
    warning(message: string, meta?: Record<string, unknown>): void;
    error(message: string, meta?: Record<string, unknown>): void;
}