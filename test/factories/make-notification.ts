import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { Notification, NotificationProps } from "@/domain/notification/enterprise/entities/notification"

export function makeNotification(override: Partial<NotificationProps> = {}, id?: UniqueEntityID) {
    const notification = Notification.create({
        recipientId: new UniqueEntityID('recipient-1'),
        title: 'Nova notificação',
        content: 'Você recebeu uma nova notificação',
        ...override
    }, id)

    return notification
}