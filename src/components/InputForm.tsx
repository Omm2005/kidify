"use client";

import { useChat } from "ai/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { CreateQuery } from "~/lib/actions";
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
      onFinish: async(data) => await CreateQuery(input + '---' + years, data.content).then(() => toast.success("Query Saved Successfully and Completed!")).catch(() => toast.error("Error Saving Query!")),
    });

    const OnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      handleSubmit(event, {
        data: {
          prompt: input + '---' + years,
        },
      });
    };

  const handleAddOneYear = () => {
      setYears(years + 1);
  }
  const handleSubOneYear = () => {
      setYears(years - 1);
  }

  // Checks if the form is submitting


  return (
    <>
              <div className="flex flex-col gap-3 text-center justify-center items-center">
<div>
        <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-[5rem]">
          Explain Like I am </h1>
<div><Button variant='outline' size='icon' className='align-middle' disabled={years <= 1} onClick={handleSubOneYear}> <ChevronLeft /> </Button>{' '} <Input value={years} type="number" onChange={(e) => { setYears(((parseInt(e.target.value) >= 101 || parseInt(e.target.value) <= 0) || e.target.value === '') ? 5 : parseInt(e.target.value) )}} className="w-40 text-center h-fit text-7xl inline-block" min={1} max={100} /> {' '} <Button variant='outline' size='icon' className='align-middle' disabled={years >= 100} onClick={handleAddOneYear}> <ChevronRight /> </Button> </div> </div>
        <p className="text-muted-foreground">
          A platform to explain complex topics in simple words. It&apos;s like you are explaining to a {years} years old.
        </p>
        </div>
    <form
      onSubmit={(event) => {
        OnSubmit(event);
      }}
      className="flex w-full flex-col items-center justify-center gap-2 md:items-center md:gap-4"
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
      </>
  );
};

export default InputForm;
