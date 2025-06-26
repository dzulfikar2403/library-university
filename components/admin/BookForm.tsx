"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { bookSchema, TbookSchema } from "@/lib/validations";
import { useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import FileInput from "../FileInput";
import ColorPicker from "../ColorPicker";

type BookFormProps = {
  type: "create" | "update";
};

const BookForm = ({ type }: BookFormProps) => {
  const router = useRouter();

  const form = useForm<TbookSchema>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      description: "",
      author: "",
      genre: "",
      rating: 1,
      totalCopies: 1,
      coverUrl: "",
      coverColor: "",
      videoUrl: "",
      summary: "",
    },
  });

  const handleSubmit = async (data: TbookSchema) => {
    console.log(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-7">
          <div className="flex flex-col gap-4 md:flex-row">
            {/* title */}
            <div className="flex-1">

            <FormField
              control={form.control}
              name={"title"}
              render={({ field }) => (
                  <FormItem>
                  <FormLabel className="capitalize text-dark-500">
                    title
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      {...field}
                      placeholder="Enter the book title"
                      className="book-form_input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              </div>
            {/* author */}
            <div className="flex-1">

            <FormField
              control={form.control}
              name={"author"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize text-dark-500">
                    author
                  </FormLabel>
                  <FormControl>
                    <Input
                      required
                      {...field}
                      placeholder="Enter the book author"
                      className="book-form_input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
              </div>
          </div>
          {/* genre */}
          <FormField
            control={form.control}
            name={"genre"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize text-dark-500">
                  genre
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    {...field}
                    placeholder="Enter the book genre"
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* rating */}
          <FormField
            control={form.control}
            name={"rating"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize text-dark-500">
                  rating
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type="number"
                    min={1}
                    max={5}
                    {...field}
                    placeholder="Enter the book rating"
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* total copies */}
          <FormField
            control={form.control}
            name={"totalCopies"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize text-dark-500">
                  total copies of books
                </FormLabel>
                <FormControl>
                  <Input
                    required
                    type="number"
                    min={1}
                    max={1000}
                    {...field}
                    placeholder="Enter the total copies of books"
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* description */}
          <FormField
            control={form.control}
            name={"description"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize text-dark-500">
                  description
                </FormLabel>
                <FormControl>
                  <Textarea
                    required
                    {...field}
                    placeholder="Enter the book description"
                    className="book-form_input"
                    rows={5}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* book image input */}
          <FormField
            control={form.control}
            name={"coverUrl"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize text-dark-500">
                  book image
                </FormLabel>
                <FormControl>
                  <FileInput nameId={field.name} tipe="image" accept="image/*" variant="light" placeholder="Choose Book Cover" folder="/book/image" onChange={field.onChange}  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* book color input */}
          <FormField
            control={form.control}
            name={"coverColor"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize text-dark-500">
                  book primary color
                </FormLabel>
                <FormControl>
                  <ColorPicker value={field.value || '#ffffff'} onChangeColor={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* book video input */}
          <FormField
            control={form.control}
            name={"videoUrl"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize text-dark-500">
                  book video
                </FormLabel>
                <FormControl>
                  <FileInput nameId={field.name} tipe="video" accept="video/*" variant="light" placeholder="Choose Book Video" folder="/book/video" onChange={field.onChange}  />
                </FormControl>
                  <p className="text-xs text-dark-200">* optional video (not recommend)</p>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* book summary input */}
          <FormField
            control={form.control}
            name={"summary"}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize text-dark-500">
                  book summary
                </FormLabel>
                <FormControl>
                  <Textarea
                    required
                    {...field}
                    placeholder="write a brief summary of the book"
                    rows={10}
                    className="book-form_input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="book-form_btn text-white capitalize">
            {type} book
          </Button>
        </form>
      </Form>
    </>
  );
};

export default BookForm;
