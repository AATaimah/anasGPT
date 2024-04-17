import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {

  console.log(colors.bold.green('Welcome to AnasGPT!'))
  console.log(colors.bold.green('You can start chatting with me.'))

  const chatHistory = [] // store convo history

  while (true) {
    const userInput = readlineSync.question(colors.yellow('You: '));

    try {
      // iterate over messages history to construct output
      const messages = chatHistory.map(([role, content]) => ({role, content}))

      // add latest user input
      messages.push({role: 'user', content: userInput});

      // call the API with the user input
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
      })

      // Get completion content
      const completionContent = completion.choices[0].message.content;

      if (userInput.toLowerCase() === 'exit') {
        console.log(colors.bold.green('Anas: ') + completionContent);
        return
      }

      console.log(colors.bold.green('Anas: ') + completionContent);

      // Update history with user input and bot response
      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', completionContent]);


    } catch (error) {
      console.error(colors.red(error));
    }
  }

}

main();