import { ILogger, ITransport, LogLevel, LogEntry, LogLevelWeight } from './types';

/**
 * 核心调度类，负责管理传输策略和分发日志
 */
export class Logger implements ILogger {
    private transports: ITransport[] = [];
    private globalLevel: LogLevel;

    /**
     * @param globalLevel 全局最低日志等级，低于此等级的日志将被短路拦截
     */
    constructor(globalLevel: LogLevel = 'verbose') {
        this.globalLevel = globalLevel;
    }

    /**
     * 注册新的输出传输策略
     */
    public addTransport(transport: ITransport): void {
        this.transports.push(transport);
    }

    /**
     * 内部派发逻辑，组装标准数据并分发给各 Transport
     */
    private dispatch(level: LogLevel, message: string, meta?: Record<string, unknown>): void {
        if (LogLevelWeight[level] < LogLevelWeight[this.globalLevel]) {
            return;
        }

        const entry: LogEntry = {
            level,
            message,
            timestamp: Date.now(),
            meta,
        };

        for (const transport of this.transports) {
            if (LogLevelWeight[entry.level] >= LogLevelWeight[transport.level]) {
                try {
                    transport.write(entry);
                } catch (error) {
                    console.error(`[Logger Internal Error] Transport failed to write:`, error);
                }
            }
        }
    }

    public verbose(message: string, meta?: Record<string, unknown>): void {
        this.dispatch('verbose', message, meta);
    }

    public info(message: string, meta?: Record<string, unknown>): void {
        this.dispatch('info', message, meta);
    }

    public warning(message: string, meta?: Record<string, unknown>): void {
        this.dispatch('warning', message, meta);
    }

    public error(message: string, meta?: Record<string, unknown>): void {
        this.dispatch('error', message, meta);
    }
}