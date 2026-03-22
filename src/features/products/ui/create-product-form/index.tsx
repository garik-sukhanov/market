import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styled from "styled-components";
import { z } from "zod";

import {
  Button,
  ErrorText,
  Flex,
  Input,
  InputWrapper,
  Label,
  TextArea,
} from "@/shared/components/ui";
import { useAddProductMutation } from "@/shared/hooks/products";
import type { CreateProductDto } from "@/shared/types/requests";

const createProductSchema = z.object({
  title: z.string().min(1, "Укажите название"),
  description: z.string().min(1, "Укажите описание"),
  category: z.string().min(1, "Укажите категорию"),
  brand: z.string().optional(),
  price: z.coerce.number().positive("Цена должна быть больше 0"),
  stock: z.coerce
    .number()
    .int("Введите целое число")
    .min(0, "Остаток не может быть отрицательным"),
  thumbnail: z
    .string()
    .optional()
    .refine(
      (value) =>
        !value || value.trim().length === 0 || /^https?:\/\//.test(value),
      { message: "Введите корректный URL" },
    ),
  images: z.string().optional(),
  tags: z.string().optional(),
});

type CreateProductFormValues = z.input<typeof createProductSchema>;
type CreateProductParsedValues = z.infer<typeof createProductSchema>;

export type CreateProductFormProps = {
  id?: string;
  onCancel?: () => void;
  onSuccess?: () => void;
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`;

export const CreateProductForm = ({
  id,
  onCancel,
  onSuccess,
}: CreateProductFormProps) => {
  const { mutateAsync, isPending } = useAddProductMutation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateProductFormValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      brand: "",
      price: 0,
      stock: 0,
      thumbnail: "",
      images: "",
      tags: "",
    },
  });

  const cancel = () => {
    reset();
    onCancel?.();
  };

  const onSubmit = async (values: CreateProductFormValues) => {
    const parsed: CreateProductParsedValues = createProductSchema.parse(values);

    const images = (parsed.images || "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    const tags = (parsed.tags || "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    const dto: CreateProductDto = {
      title: parsed.title,
      description: parsed.description,
      category: parsed.category,
      brand: parsed.brand || undefined,
      price: parsed.price,
      stock: parsed.stock,
      thumbnail: parsed.thumbnail || undefined,
      images: images.length ? images : undefined,
      tags: tags.length ? tags : undefined,
    };

    await mutateAsync(dto);
    reset();
    onSuccess?.();
  };

  return (
    <Form id={id} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Label htmlFor="create-product-title">Название</Label>
            <Input
              {...field}
              id="create-product-title"
              $fullWidth
              $error={!!errors.title}
              placeholder="Например, iPhone 14"
            />
            {errors.title?.message && (
              <ErrorText>{errors.title.message}</ErrorText>
            )}
          </InputWrapper>
        )}
      />

      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Label htmlFor="create-product-category">Категория</Label>
            <Input
              {...field}
              id="create-product-category"
              $fullWidth
              $error={!!errors.category}
              placeholder="Например, smartphones"
            />
            {errors.category?.message && (
              <ErrorText>{errors.category.message}</ErrorText>
            )}
          </InputWrapper>
        )}
      />

      <Controller
        name="brand"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Label htmlFor="create-product-brand">Вендор</Label>
            <Input
              {...field}
              id="create-product-brand"
              $fullWidth
              $error={!!errors.brand}
              placeholder="Например, Apple"
            />
            {errors.brand?.message && (
              <ErrorText>{errors.brand.message}</ErrorText>
            )}
          </InputWrapper>
        )}
      />

      <Controller
        name="price"
        control={control}
        render={({ field }) => {
          const { value, ...restField } = field;
          return (
            <InputWrapper>
              <Label htmlFor="create-product-price">Цена</Label>
              <Input
                {...restField}
                value={(value as string | number | undefined) ?? ""}
                id="create-product-price"
                type="number"
                inputMode="decimal"
                $fullWidth
                $error={!!errors.price}
              />
              {errors.price?.message && (
                <ErrorText>{errors.price.message}</ErrorText>
              )}
            </InputWrapper>
          );
        }}
      />

      <Controller
        name="stock"
        control={control}
        render={({ field }) => {
          const { value, ...restField } = field;
          return (
            <InputWrapper>
              <Label htmlFor="create-product-stock">Остаток</Label>
              <Input
                {...restField}
                value={(value as string | number | undefined) ?? ""}
                id="create-product-stock"
                type="number"
                inputMode="numeric"
                $fullWidth
                $error={!!errors.stock}
              />
              {errors.stock?.message && (
                <ErrorText>{errors.stock.message}</ErrorText>
              )}
            </InputWrapper>
          );
        }}
      />

      <Controller
        name="thumbnail"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Label htmlFor="create-product-thumbnail">Превью (URL)</Label>
            <Input
              {...field}
              id="create-product-thumbnail"
              $fullWidth
              $error={!!errors.thumbnail}
              placeholder="https://..."
            />
            {errors.thumbnail?.message && (
              <ErrorText>{errors.thumbnail.message}</ErrorText>
            )}
          </InputWrapper>
        )}
      />

      <Controller
        name="images"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Label htmlFor="create-product-images">
              Изображения (через запятую)
            </Label>
            <Input
              {...field}
              id="create-product-images"
              $fullWidth
              $error={!!errors.images}
              placeholder="https://... , https://..."
            />
            {errors.images?.message && (
              <ErrorText>{errors.images.message}</ErrorText>
            )}
          </InputWrapper>
        )}
      />

      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Label htmlFor="create-product-tags">Теги (через запятую)</Label>
            <Input
              {...field}
              id="create-product-tags"
              $fullWidth
              $error={!!errors.tags}
              placeholder="new, sale, popular"
            />
            {errors.tags?.message && (
              <ErrorText>{errors.tags.message}</ErrorText>
            )}
          </InputWrapper>
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <InputWrapper>
            <Label htmlFor="create-product-description">Описание</Label>
            <TextArea
              {...field}
              id="create-product-description"
              $fullWidth
              $error={!!errors.description}
              placeholder="Краткое описание товара"
            />
            {errors.description?.message && (
              <ErrorText>{errors.description.message}</ErrorText>
            )}
          </InputWrapper>
        )}
      />

      <Flex $justify="flex-end" $gap={2}>
        <Button $variant="secondary" type="button" onClick={cancel}>
          Отмена
        </Button>
        <Button type="submit" disabled={isPending}>
          Создать
        </Button>
      </Flex>
    </Form>
  );
};
