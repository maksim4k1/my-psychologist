import { ChangeEvent } from "react";

export const onChangeInputHandler = (setFormData: CallableFunction) => (event: ChangeEvent<HTMLInputElement>) => {
  let type: string = event.target.type;
  let name: string = event.target.name;
  let value: string = event.target.value;

  if (type === "radio") {
    setFormData((data: Object) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  } else if (type === "checkbox") {
    setFormData((data: Object) => {
      if (!Object.keys(data).includes(name)) return data;
      let set: Set<string> = new Set(data[name]);

      if (set.has(value)) set.delete(value);
      else set.add(value);

      return {
        ...data,
        [name]: Array.from(set),
      };
    });
  } else{
    setFormData((data: Object) => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  }
}
