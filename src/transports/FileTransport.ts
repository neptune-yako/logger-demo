import { ITransport, LogEntry, LogLevel } from '../types';
import fs from 'fs';
import path from 'path';

function NativeFileWriteSync(filePath: string, buffer: string): void {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    fs.appendFileSync(filePath, buffer, 'utf-8');
    console.log(`\n--- [File I/O: ${filePath}] ---\n${buffer}----------------------------------\n`);
}

/**
 * 基于文件系统的日志输出策略
 */
export class FileTransport implements ITransport {
    public level: LogLevel;
    private filePath: string;

    /**
     * @param filePath 日志文件输出路径
     * @param level 当前传输器关注的最低日志等级
     */
    constructor(filePath: string, level: LogLevel = 'info') {
        this.filePath = filePath;
        this.level = level;
    }

    public write(entry: LogEntry): void {
        const logData = {
            time: new Date(entry.timestamp).toISOString(),
            level: entry.level,
            msg: entry.message,
            ...entry.meta,
        };

        const buffer = JSON.stringify(logData) + '\n';
        NativeFileWriteSync(this.filePath, buffer);
    }
}