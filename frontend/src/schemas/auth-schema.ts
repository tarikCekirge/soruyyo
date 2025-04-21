import { z } from "zod";

const MAX_FILE_SIZE = 1024 * 1024 * 3; // 3MB

export const authFormSchema = z
  .object({
    fullName: z
      .string({ message: "Ad Soyad zorunludur" })
      .min(4, { message: "Ad Soyad en az 4 karakter olmalıdır." })
      .regex(/^[a-zA-ZşŞıİçÇğĞüÜöÖ\s]+$/, {
        message: "Ad Soyad sadece harflerden oluşmalıdır.",
      }),
    username: z
      .string()
      .min(4, { message: "Kullanıcı adı en az 4 karakter olmalıdır." })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message:
          "Kullanıcı adı sadece harf, rakam ve alt çizgi (_) içerebilir.",
      }),
    email: z.string().email({ message: "Geçerli bir e-posta adresi giriniz." }),
    password: z
      .string()
      .min(6, { message: "Şifre en az 6 karakter olmalıdır." }),
    confirmPassword: z
      .string()
      .min(6, { message: "Şifre tekrarı en az 6 karakter olmalıdır." }),
    profileImg: z
      .string({ message: "Profil fotoğrafı zorunludur." })
      .refine((value) => value.startsWith("data:image/"), {
        message: "Sadece .jpg, .jpeg, .png veya .webp formatları geçerlidir.",
      })
      .refine(
        (value) => {
          const matches = value.match(
            /^data:image\/(jpeg|jpg|png|webp);base64,/
          );
          return matches ? true : false;
        },
        {
          message: "Sadece .jpg, .jpeg, .png veya .webp formatları geçerlidir.",
        }
      )
      .refine(
        (value) => {
          const base64Data = value.split(",")[1];
          const fileSize =
            base64Data.length * (3 / 4) -
            (base64Data.indexOf("=") > 0
              ? base64Data.length - base64Data.indexOf("=")
              : 0);
          return fileSize <= MAX_FILE_SIZE; // Check file size
        },
        {
          message: "Maksimum dosya boyutu 3MB olmalıdır.",
        }
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Şifreler eşleşmiyor.",
  });

export type AuthFormValues = z.infer<typeof authFormSchema>;
