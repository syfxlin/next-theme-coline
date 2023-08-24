import { Field } from "@staticcms/core";
import { defineNestedType, FieldDefWithName, LocalDocument } from "@contentlayer/source-files";

export const fields = (name: string, items: Field[]): FieldDefWithName[] => {
  const results: FieldDefWithName[] = [];
  for (const item of items) {
    switch (item.widget) {
      case "string":
      case "text":
      case "code":
      case "color":
      case "hidden":
        results.push({
          type: "string",
          name: item.name,
          description: item.label,
          required: item.required,
          default: typeof item.default === "string" ? String(item.default) : undefined,
        });
        break;
      case "select":
        results.push({
          type: "enum",
          name: item.name,
          description: item.label,
          required: item.required,
          options: item.options.map((i) => String(typeof i === "string" || typeof i === "number" ? i : i.value)),
        });
        break;
      case "boolean":
        results.push({
          type: "boolean",
          name: item.name,
          description: item.label,
          required: item.required,
          default: item.default,
        });
        break;
      case "number":
        results.push({
          type: "number",
          name: item.name,
          description: item.label,
          required: item.required,
          default: typeof item.default === "string" ? Number(item.default) : item.default,
        });
        break;
      case "datetime":
        results.push({
          type: "date",
          name: item.name,
          description: item.label,
          required: item.required,
          default: item.default,
        });
        break;
      case "image":
        results.push({
          type: "image",
          name: item.name,
          description: item.label,
          required: item.required,
          default: item.default,
        });
        break;
      case "list":
        const rename = `${name}${item.name.substring(0, 1).toUpperCase()}${item.name.substring(1)}`;
        if (!item.fields) {
          results.push({
            type: "list",
            name: item.name,
            description: item.label,
            required: item.required,
            default: item.default,
            of: { type: "string" },
          });
        } else if (item.fields.length === 1) {
          results.push({
            type: "list",
            name: item.name,
            description: item.label,
            required: item.required,
            default: item.default,
            // @ts-ignore
            of: fields(rename, item.fields)[0],
          });
        } else {
          results.push({
            type: "list",
            name: item.name,
            description: item.label,
            required: item.required,
            default: item.default,
            of: defineNestedType(() => ({
              name: rename,
              fields: item.fields ? fields(rename, item.fields) : undefined,
            })),
          });
        }
        break;
      case "markdown":
        break;
      default:
        throw new Error(`unsupported field widget: ${item.name}(${item.widget})`);
    }
  }
  return results;
};

export const images = (doc: LocalDocument, items: Field[]) => {
  const results: any[] = [];
  for (const item of items) {
    if (item.widget === "image" && doc[item.name]) {
      results.push(doc[item.name]);
    }
    if (item.widget === "list" && doc[item.name]) {
      for (const element of doc[item.name]) {
        results.push(...images(element, item.fields ?? []));
      }
    }
  }
  return results;
};
