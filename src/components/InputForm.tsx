"use client";

import { useChat } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { QuestionToDB } from "~/lib/actions";
import Markdown from "./Markdown";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

interface InputFormProps {}

const InputForm = ({}: InputFormProps) => {
  const [years , setYears] = useState<number>(5);
  const { messages, input, handleInputChange, handleSubmit, isLoading, setMessages } =
    useChat({
      api: "api/genai",
    });

  const OnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit(event, {
      data: {
        prompt: input + '---' + years,
      },
    });
  };

  if ((messages && messages.length >= 2) && isLoading === false) {
    QuestionToDB(messages[0]!.content + "---" + years, messages[1]!.content);
  }

  const handleAddOneYear = () => {
    if(years >= 100){
      toast.error('You can\'t go above 100 years');
    } else {
      setYears(years + 1);
    }
  }
  const handleSubOneYear = () => {
    if(years <= 1){
      toast.error('You can\'t go below 1 year');
    } else {
      setYears(years - 1);
    }
  }

  // Checks if the form is submitting


  return (
    <form
      onSubmit={(event) => {
        OnSubmit(event);
      }}
      className="flex w-full flex-col items-center justify-center gap-2 md:items-center md:gap-4"
    >
              <div className="flex flex-col gap-3 text-center justify-center items-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-[5rem]">
          Explain Like I am <span  className={`align-middle inline-block cursor-pointer border border-muted rounded-lg p-2 ${years <= 1 && 'text-muted-foreground cursor-not-allowed'}`} onClick={handleSubOneYear}> <ChevronLeft /> </span>{' '} {years} {' '} <span className={`align-middle inline-block cursor-pointer border border-muted rounded-lg p-2 ${years >= 100 && 'text-muted-foreground cursor-not-allowed'}`} onClick={handleAddOneYear}> <ChevronRight /> </span>
        </h1>
        <p className="text-muted-foreground">
          A platform to explain complex topics in simple words. It&apos;s like you are explaining to a {years} years old.
        </p>
        </div>
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
          <Button onClick={() => setMessages([])} disabled={isLoading} >Ask Another Question</Button>
        </>
      ) : (
        <>
        <div className="flex flex-col md:flex-row md:w-1/2 w-full gap-5"> 

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
      </div>
        </>
      )}
    </form>
  );
};

export default InputForm;
