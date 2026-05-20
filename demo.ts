// 业务使用示例
import { Logger, ConsoleTransport, FileTransport } from './src';
import fs from 'fs';
import path from 'path';

// 自动创建 logs 目录（如果不存在）
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const logger = new Logger('verbose');


logger.addTransport(new ConsoleTransport('verbose'));


logger.addTransport(new FileTransport('./logs/app.log', 'info'));

// 业务运行阶段
console.log('\n--- 模拟业务运行开始 ---\n');

// 场景 A
logger.info('User login successful', {
    userId: 1001,
    role: 'admin'
});

// 场景 B
logger.error('Payment gateway timeout', {
    orderId: 'ORD-20260520-999',
    retryCount: 3,
    trace: 'Timeout at TCP connection'
});

// 场景 C
logger.verbose('Component <Button> re-rendered', {
    renderTimeMs: 1.2,
    componentId: 'btn-submit'
});

console.log('\n--- 模拟业务运行结束 ---\n');