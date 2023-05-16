import amqp from "amqplib";

interface Message {
	[key: string]: any;
}

interface MessageHandler {
	(message: Message): void;
}

class MessageBroker {
	private connection!: amqp.Connection;
	private channel!: amqp.Channel;
	private url: string;

	constructor(url: string) {
		this.url = url;
	}

	public async connect(): Promise<void> {
		try {
			this.connection = await amqp.connect(this.url);
			this.channel = await this.connection.createChannel();
		} catch (err) {
			console.error(`Error connecting to RabbitMQ: ${err}`);
			throw err;
		}
	}

	public async publish(queue: string, message: Message): Promise<void> {
		try {
			await this.channel.assertQueue(queue);
			await this.channel.sendToQueue(
				queue,
				Buffer.from(JSON.stringify(message))
			);
		} catch (err) {
			console.error(`Error publishing message to queue ${queue}: ${err}`);
			throw err;
		}
	}

	public async consume(
		queue: string,
		handler: MessageHandler
	): Promise<void> {
		try {
			await this.channel.assertQueue(queue);
			await this.channel.consume(queue, (message) => {
				if (message !== null) {
					const payload = JSON.parse(message.content.toString());
					handler(payload);
					this.channel.ack(message);
				}
			});
		} catch (err) {
			console.error(
				`Error consuming messages from queue ${queue}: ${err}`
			);
			throw err;
		}
	}

	public async disconnect(): Promise<void> {
		try {
			await this.channel.close();
			await this.connection.close();
		} catch (err) {
			console.error(`Error disconnecting from RabbitMQ: ${err}`);
			throw err;
		}
	}
}

export const messageBroker = new MessageBroker("amqp://message-broker");