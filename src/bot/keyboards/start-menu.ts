import { InlineKeyboard } from 'grammy'

export const startKeyboard = new InlineKeyboard()
  .text('New expense', 'create-expense')
  .text('Get stats', 'get-stats')

export const moreStatsKeyboard = new InlineKeyboard()
  .text('Past month', 'past-month')
  .text('This month', 'this-month')
  .text('Choose month', 'choose-month')

//   [KeyboardButton('Show me Google!', web_app=WebAppInfo('https://google.com'))]
// ]
