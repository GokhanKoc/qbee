import * as AuthActions from './auth'
import * as ChatsActions from './chats'
import * as CardActions from './cards'


export const ActionCreators = Object.assign({},
  AuthActions,
  ChatsActions,
  CardActions
);
