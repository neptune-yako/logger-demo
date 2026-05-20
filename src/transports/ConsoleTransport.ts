import { ITransport, LogEntry, LogLevel } from '../types';

/**
 * 基于控制台的日志输出策略
 */
export class ConsoleTransport implements ITransport {
    public level: LogLevel;

    /**
     * @param level 当前传输器关注的最低日志等级
     */
    constructor(level: LogLevel = 'verbose') {
        this.level = level;
    }

    public write(entry: LogEntry): void {
        const time = new Date(entry.timestamp).toISOString();
        let metaStr = '';
        if (entry.meta) {
            try {
                metaStr = `\n  ↳ 附加信息: ${JSON.stringify(entry.meta, null, 2)}`;
            } catch (e) {
                metaStr = `\n  ↳ 附加信息: [序列化失败: 存在循环引用或大对象]`;
            }
        }
        const formattedMessage = `[${time}] [${entry.level.toUpperCase()}] ${entry.message}${metaStr}`;
        switch (entry.level) {
            case 'error':
                console.error(formattedMessage);
                break;
            case 'warning':
                console.warn(formattedMessage);
                break;
            case 'info':
                console.info(formattedMessage);
                break;
            case 'verbose':
            default:
                console.log(formattedMessage);
                break;
        }
    }
}