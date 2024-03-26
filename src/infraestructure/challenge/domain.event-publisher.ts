
export class DomainEventPublisher {
    private static subscribers = new Map<string, Function[]>();

    static subscribe(eventName: string, subscriber: Function): void {
        if (!this.subscribers.has(eventName)) {
            this.subscribers.set(eventName, []);
        }
        this.subscribers.get(eventName).push(subscriber);
    }

    static publish(event: any): void {
        const eventName = event.constructor.name;
        const eventSubscribers = this.subscribers.get(eventName) || [];
        eventSubscribers.forEach(subscriber => subscriber(event));
    }
}
