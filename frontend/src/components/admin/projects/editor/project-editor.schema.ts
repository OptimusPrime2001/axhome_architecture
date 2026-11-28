import { isValidImageSrc } from "@lib";
import type {
  FloorPlan,
  GallerySpaceCategory,
  Project,
  ProjectHighlight,
  ProjectImage,
  ProjectMilestone,
} from "@shared-types";
import { z } from "zod";

const imageUrlStringSchema = (emptyMsg: string) =>
  z
    .string()
    .trim()
    .min(1, emptyMsg)
    .refine(
      isValidImageSrc,
      "Đường dẫn ảnh phải bắt đầu bằng https://, http:// hoặc /",
    );

export const SPACE_CATEGORY_OPTIONS: ReadonlyArray<{
  value: GallerySpaceCategory;
  label: string;
}> = [
  { value: "exterior_day", label: "Ngoại thất ban ngày" },
  { value: "exterior_night", label: "Ngoại thất ban đêm" },
  { value: "living_room", label: "Phòng khách" },
  { value: "pool_garden", label: "Hồ bơi & sân vườn" },
  { value: "interior_other", label: "Không gian khác" },
];

export function slugifyVietnamese(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export const galleryItemSchema = z.object({
  id: z.string(),
  url: imageUrlStringSchema("Vui lòng chọn hoặc nhập đường dẫn ảnh."),
  caption: z.string().trim().min(1, "Vui lòng nhập chú thích cho góc nhìn."),
  type: z.enum(["render_3d", "real_photo"]),
  spaceCategory: z.enum([
    "exterior_day",
    "exterior_night",
    "living_room",
    "pool_garden",
    "interior_other",
  ]),
  isCover: z.boolean(),
});

export const highlightItemSchema = z.object({
  title: z.string().trim().min(1, "Vui lòng nhập tiêu đề điểm nhấn."),
  description: z.string().trim().min(1, "Vui lòng nhập mô tả giải pháp."),
});

export const floorPlanItemSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập tên tầng (VD: Mặt bằng Tầng 1)."),
  imageUrl: imageUrlStringSchema("Vui lòng tải ảnh hoặc nhập link bản vẽ."),
  areaSquareMeters: z
    .number()
    .refine((v) => !Number.isNaN(v) && v > 0, "Diện tích tầng phải lớn hơn 0."),
  description: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập mô tả bố trí công năng."),
  rooms: z.array(z.string()),
});

export const milestoneItemSchema = z.object({
  id: z.string(),
  title: z.string().trim().min(1, "Vui lòng nhập tên hạng mục nghiệm thu."),
  period: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập mốc thời gian (VD: Tháng 10/2024)."),
  description: z
    .string()
    .trim()
    .min(1, "Vui lòng nhập chi tiết công việc thực hiện."),
  isCompleted: z.boolean(),
});

export const projectEditorSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Tên dự án cần tối thiểu 3 ký tự.")
    .max(120, "Tên dự án tối đa 120 ký tự."),
  slug: z
    .string()
    .trim()
    .min(3, "Đường dẫn tĩnh (slug) cần tối thiểu 3 ký tự.")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug chỉ bao gồm chữ thường không dấu, chữ số và dấu gạch ngang.",
    ),
  projectType: z.enum(["concept", "under_construction", "completed"]),
  category: z.enum(["villa", "townhouse", "mansion"]),
  style: z.enum(["modern", "neoclassic", "minimalist", "indochine"]),

  location: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập địa chỉ hoặc khu đô thị của dự án."),
  city: z.string().trim().min(2, "Vui lòng nhập Tỉnh / Thành phố."),
  completedYear: z
    .number()
    .refine(
      (v) => !Number.isNaN(v) && v >= 2000 && v <= 2035,
      "Năm thực hiện hợp lệ từ 2000 – 2035.",
    ),
  clientName: z.string(),
  leadArchitect: z
    .string()
    .trim()
    .min(2, "Vui lòng nhập tên Kiến trúc sư / Chỉ huy trưởng chủ trì."),
  constructionDuration: z.string(),

  landArea: z
    .number()
    .refine(
      (v) => !Number.isNaN(v) && v > 0,
      "Diện tích khu đất phải lớn hơn 0 m².",
    ),
  floorArea: z
    .number()
    .refine(
      (v) => !Number.isNaN(v) && v > 0,
      "Tổng diện tích sàn phải lớn hơn 0 m².",
    ),
  facadeWidth: z
    .number()
    .refine(
      (v) => !Number.isNaN(v) && v > 0,
      "Chiều rộng mặt tiền phải lớn hơn 0m.",
    ),
  floorsCount: z
    .number()
    .refine((v) => !Number.isNaN(v) && v >= 1, "Số tầng phải từ 1 trở lên."),
  bedroomsCount: z
    .number()
    .refine((v) => !Number.isNaN(v) && v >= 0, "Số phòng ngủ không hợp lệ."),

  excerpt: z
    .string()
    .trim()
    .min(15, "Mô tả ngắn ý tưởng cần tối thiểu 15 ký tự.")
    .max(300, "Mô tả ngắn tối đa 300 ký tự."),
  contentHtml: z
    .string()
    .trim()
    .min(20, "Vui lòng biên soạn nội dung thuyết minh ý tưởng & giải pháp."),

  highlights: z.array(highlightItemSchema).max(4),

  hasTestimonial: z.boolean(),
  testimonialAuthor: z.string(),
  testimonialRole: z.string(),
  testimonialQuote: z.string(),

  coverImage: imageUrlStringSchema(
    "Vui lòng tải lên hoặc chọn Ảnh đại diện chính (16:9).",
  ),
  gallery: z.array(galleryItemSchema),
  floorPlans: z.array(floorPlanItemSchema),
  milestones: z.array(milestoneItemSchema),

  seoTitle: z.string().max(70, "Tiêu đề SEO khuyến nghị tối đa 70 ký tự."),
  seoDescription: z
    .string()
    .max(180, "Mô tả Meta SEO khuyến nghị tối đa 180 ký tự."),

  isFeatured: z.boolean(),
  status: z.enum(["draft", "published"]),
});

export type ProjectEditorFormValues = z.infer<typeof projectEditorSchema>;

export function getDefaultEditorValues(): ProjectEditorFormValues {
  return {
    title: "",
    slug: "",
    projectType: "concept",
    category: "villa",
    style: "modern",
    location: "",
    city: "",
    completedYear: new Date().getFullYear(),
    clientName: "",
    leadArchitect: "Default user",
    constructionDuration: "12 Tháng",
    landArea: 300,
    floorArea: 450,
    facadeWidth: 15,
    floorsCount: 3,
    bedroomsCount: 4,
    excerpt: "",
    contentHtml: "",
    highlights: [
      {
        title: "Tối ưu thông gió & ánh sáng tự nhiên",
        description:
          "Tổ chức khoảng thông tầng trung tâm kết hợp hệ lam che nắng hướng Tây giảm bức xạ nhiệt.",
      },
    ],
    hasTestimonial: false,
    testimonialAuthor: "",
    testimonialRole: "",
    testimonialQuote: "",
    coverImage: "",
    gallery: [],
    floorPlans: [],
    milestones: [],
    seoTitle: "",
    seoDescription: "",
    isFeatured: false,
    status: "draft",
  };
}

export function projectToFormValues(project: Project): ProjectEditorFormValues {
  return {
    title: project.title,
    slug: project.slug,
    projectType: project.projectType,
    category: project.category,
    style: project.style,
    location: project.location,
    city: project.city,
    completedYear: project.completedYear,
    clientName: project.clientName ?? "",
    leadArchitect: project.leadArchitect,
    constructionDuration: project.constructionDuration ?? "",
    landArea: project.landArea,
    floorArea: project.floorArea,
    facadeWidth: project.facadeWidth,
    floorsCount: project.floorsCount,
    bedroomsCount: project.bedroomsCount,
    excerpt: project.excerpt,
    contentHtml: project.contentHtml.trim(),
    highlights:
      project.highlights?.map((h) => ({
        title: h.title,
        description: h.description,
      })) ?? [],
    hasTestimonial: Boolean(project.clientTestimonial?.quote),
    testimonialAuthor: project.clientTestimonial?.author ?? "",
    testimonialRole: project.clientTestimonial?.role ?? "",
    testimonialQuote: project.clientTestimonial?.quote ?? "",
    coverImage: project.coverImage,
    gallery: project.gallery.map((img) => ({
      id: img.id,
      url: img.url,
      caption: img.caption,
      type: img.type,
      spaceCategory: img.spaceCategory ?? "exterior_day",
      isCover: Boolean(img.isCover),
    })),
    floorPlans:
      project.floorPlans?.map((fp) => ({
        id: fp.id,
        name: fp.name,
        imageUrl: fp.imageUrl,
        areaSquareMeters: fp.areaSquareMeters,
        description: fp.description,
        rooms: fp.rooms ? [...fp.rooms] : [],
      })) ?? [],
    milestones:
      project.milestones?.map((ms) => ({
        id: ms.id,
        title: ms.title,
        period: ms.period,
        description: ms.description,
        isCompleted: ms.isCompleted,
      })) ?? [],
    seoTitle: project.seoTitle ?? "",
    seoDescription: project.seoDescription ?? "",
    isFeatured: project.isFeatured,
    status: project.status,
  };
}

export function formValuesToProject(
  values: ProjectEditorFormValues,
  existing?: Project,
  nextId?: string,
): Project {
  const highlights: ProjectHighlight[] | undefined =
    values.highlights.length > 0
      ? values.highlights.map((h) => ({
          title: h.title.trim(),
          description: h.description.trim(),
        }))
      : undefined;

  const clientTestimonial =
    values.hasTestimonial && values.testimonialQuote.trim()
      ? {
          author: values.testimonialAuthor.trim() || "Chủ đầu tư",
          role: values.testimonialRole.trim() || `Chủ đầu tư ${values.title}`,
          quote: values.testimonialQuote.trim(),
        }
      : undefined;

  const gallery: ProjectImage[] = values.gallery.map((img) => ({
    id: img.id,
    url: img.url.trim(),
    caption: img.caption.trim(),
    type: img.type,
    spaceCategory: img.spaceCategory,
    isCover: img.isCover,
  }));

  const floorPlans: FloorPlan[] | undefined =
    values.floorPlans.length > 0
      ? values.floorPlans.map((fp) => ({
          id: fp.id,
          name: fp.name.trim(),
          imageUrl: fp.imageUrl.trim(),
          areaSquareMeters: fp.areaSquareMeters,
          description: fp.description.trim(),
          rooms: fp.rooms.filter((r) => r.trim() !== ""),
        }))
      : undefined;

  const milestones: ProjectMilestone[] | undefined =
    values.milestones.length > 0
      ? values.milestones.map((ms) => ({
          id: ms.id,
          title: ms.title.trim(),
          period: ms.period.trim(),
          description: ms.description.trim(),
          isCompleted: ms.isCompleted,
        }))
      : undefined;

  return {
    id: existing?.id ?? nextId ?? `proj-${Date.now()}`,
    title: values.title.trim(),
    slug: values.slug.trim(),
    projectType: values.projectType,
    category: values.category,
    style: values.style,
    location: values.location.trim(),
    city: values.city.trim(),
    completedYear: values.completedYear,
    clientName: values.clientName.trim() || undefined,
    leadArchitect: values.leadArchitect.trim(),
    constructionDuration: values.constructionDuration.trim() || undefined,
    landArea: values.landArea,
    floorArea: values.floorArea,
    facadeWidth: values.facadeWidth,
    floorsCount: values.floorsCount,
    bedroomsCount: values.bedroomsCount,
    excerpt: values.excerpt.trim(),
    contentHtml: values.contentHtml.trim(),
    highlights,
    technicalChallenges: existing?.technicalChallenges,
    technicalSolutions: existing?.technicalSolutions,
    clientTestimonial,
    coverImage: values.coverImage.trim(),
    gallery,
    floorPlans,
    milestones,
    seoTitle: values.seoTitle.trim() || undefined,
    seoDescription: values.seoDescription.trim() || undefined,
    isFeatured: values.isFeatured,
    status: values.status,
    viewCount: existing?.viewCount ?? 0,
    createdAt: existing?.createdAt ?? new Date().toISOString().slice(0, 10),
  };
}
