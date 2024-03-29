import { Editor } from "@tiptap/vue-3";
import { type InstanceId } from "~/types/models/base";

type FieldName = string;
type FieldValue = string | object;

interface Fields {
  [key: FieldName]: FieldValue;
}

export class InstanceUpdater {
  instance_id: InstanceId;
  fields: Fields;
  action: Function;

  constructor(instance_id: InstanceId, fields: Fields, action: Function) {
    this.instance_id = instance_id;
    this.fields = fields;
    this.action = action;
  }

  maybe_update(field_name: FieldName, new_field_value: FieldValue) {
    return function (this: InstanceUpdater) {
      if (new_field_value === this.fields[field_name]) {
        const serialized_new_field_value =
          typeof new_field_value === "object"
            ? JSON.stringify(new_field_value)
            : new_field_value;
        this.action(this.instance_id, {
          [field_name]: serialized_new_field_value,
        });
      }
    };
  }

  handle_input(field_name: FieldName, event: Event) {
    const element = event.target as HTMLElement;
    const new_field_value = element.innerText;
    this.fields[field_name] = new_field_value;
    setTimeout(this.maybe_update(field_name, new_field_value).bind(this), 1000);
  }

  handle_tiptap(field_name: FieldName, tiptap_editor: Editor) {
    const new_field_value = tiptap_editor.getJSON();
    this.fields[field_name] = new_field_value;
    setTimeout(this.maybe_update(field_name, new_field_value).bind(this), 1000);
  }
}
