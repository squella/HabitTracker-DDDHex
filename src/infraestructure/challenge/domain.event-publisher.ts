export class DomainEventPublisher {
    private static subscribers = new Map<string, Function[]>();
    private static publishedEvents: any[] = []; // Almacenamos los eventos publicados para fines de prueba y registro

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

        // Agregar el evento al registro de eventos publicados
        this.publishedEvents.push(event);
    }

    // Método para obtener los eventos publicados (útil para pruebas)
    static getPublishedEvents(): any[] {
        return this.publishedEvents;
    }

    // Método para limpiar los eventos publicados (útil para pruebas)
    static clearPublishedEvents(): void {
        this.publishedEvents = [];
    }
}
