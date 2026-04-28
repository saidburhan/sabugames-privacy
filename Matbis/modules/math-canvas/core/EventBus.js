// core/EventBus.js
/**
 * Simple Pub/Sub Event Bus for modular communication.
 */
class EventBus {
    constructor() {
        this.listeners = {};
    }

    /**
     * Subscribe to an event.
     * @param {string} event - The event name.
     * @param {function} callback - The callback function.
     * @returns {function} - Unsubscribe function.
     */
    on(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
        return () => this.off(event, callback);
    }

    /**
     * Unsubscribe from an event.
     * @param {string} event - The event name.
     * @param {function} callback - The callback function.
     */
    off(event, callback) {
        if (!this.listeners[event]) return;
        this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }

    /**
     * Publish an event.
     * @param {string} event - The event name.
     * @param {any} data - The data to pass to listeners.
     */
    emit(event, data) {
        if (!this.listeners[event]) return;
        this.listeners[event].forEach(cb => {
            try {
                cb(data);
            } catch (err) {
                console.error(`Error in EventBus listener for "${event}":`, err);
            }
        });
    }
}

// Export a singleton instance
export const eventBus = new EventBus();
