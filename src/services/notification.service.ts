import RabbitMQServer from "../rabbitmq.server";

export class NotificationService {

    static async sendNotification(message: string) {
        const uri = 'amqp://admin:admin@rabbitmq:5672';
        const queue = 'swordhealth';
        
        const server = new RabbitMQServer(uri);
        await server.start();
        server.publish(queue, message);
    }
}