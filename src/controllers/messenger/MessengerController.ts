import { render } from '../../utils/render';
import { render as messengerPage } from '../../views/pages/messenger/index';
import { messages, chat } from '../../utils/types';

export class MessengerController {
  index():void {
    // В будущем будет приходить из моделей
    const messages:messages[] = [
      {
        timestamp: '19 июня',
        messages: [
          {
            type: 'text',
            ingoing: true,
            time: '12:00',
            status: false,
            content: '<p>Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.</p>'
                            + '<p>Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.</p>',
          },
          {
            type: 'text',
            ingoing: false,
            time: '11:56',
            status: true,
            content: '<p>Круто!</p>',
          },
        ],
      },
    ];
    const chats:chat[] = [
      {
        name: 'Андрей',
        excerpt: 'Сообщение',
        time: '10:49',
        counter: 2,
      },
    ];
    render('#page', messengerPage(chats, messages));
  }
}
