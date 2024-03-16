"use client";

import { useChat } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { QuestionToDB } from "~/lib/actions";
import Markdown from "./Markdown";

interface InputFormProps {}

const InputForm = ({}: InputFormProps) => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } =
    useChat({
      api: "api/genai",
    });

  const OnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(event, {
      data: {
        prompt: input,
      },
    });
  };

  if ((messages && messages.length >= 2) && isLoading === false) {
    QuestionToDB(messages[0]!.content, messages[1]!.content);
  }

  // Checks if the form is submitting

  return (
    <form
      onSubmit={(event) => {
        OnSubmit(event);
      }}
      className="flex w-full flex-col items-center justify-center gap-2 md:flex-row md:items-start md:gap-4"
    >
      {messages.length > 1 ? (
        <>
          <div className="flex flex-col items-center justify-center gap-3">
            {messages.map((message, index) => {
              return (
                <div
                  key={index}
                  className="w-full gap-2 rounded-lg border border-muted-foreground bg-background p-4 text-foreground shadow-md"
                >
                  <Markdown text={message.content} />
                </div>
              );
            })}
          </div>
          <Button onClick={() => setMessages([])}>Ask Another Question</Button>
        </>
      ) : (
        <>
          <Input
            type="text"
            placeholder={
              isLoading ? "Generating . . ." : "ask something . . . "
            }
            maxLength={30}
            minLength={2}
            onChange={handleInputChange}
          />
          <Button type="submit" className="w-full md:w-auto">
            {isLoading ? "Submitting..." : "Ask"}
          </Button>
        </>
      )}
    </form>
  );
};

export default InputForm;
