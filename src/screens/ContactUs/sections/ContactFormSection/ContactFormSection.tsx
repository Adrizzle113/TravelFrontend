import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";

export const ContactFormSection = (): JSX.Element => {
  // Form fields data
  const formFields = [
    {
      id: "firstName",
      label: "First Name",
      placeholder: "first name",
      type: "input",
    },
    {
      id: "lastName",
      label: "Last Name",
      placeholder: "last name",
      type: "input",
    },
    {
      id: "email",
      label: "Email Address",
      placeholder: "Hello@email",
      type: "input",
    },
    {
      id: "subject",
      label: "Subjek",
      placeholder: "-- Choose Topic --",
      type: "select",
    },
    {
      id: "message",
      label: "Pesan",
      placeholder: "Ketik pesan disini...",
      type: "textarea",
    },
  ];

  // Contact info data
  const contactInfo = [
    {
      icon: <MapPinIcon className="text-app-secondary w-[35px] h-[35px]" />,
      title: "Tempat Kami",
      content: "Jakarta, Indonesia",
    },
    {
      icon: <MailIcon className="text-app-secondary w-[35px] h-[35px]" />,
      title: "Email Address",
      content: "Hello@Email.com",
    },
    {
      icon: <PhoneIcon className="text-app-secondary w-[35px] h-[35px]" />,
      title: "Telephone",
      content: "( +62 ) 123 456 789",
    },
  ];

  return (
    <section className="flex flex-wrap gap-[60px] py-[100px] px-[100px] bg-[#f3ecdc]">
      <Card className="flex-1 p-[50px] bg-white-smoke rounded-[30px] shadow-shadow-shape">
        <CardContent className="flex flex-col items-start gap-5 p-0">
          <h2 className="self-stretch font-heading-medium text-heading text-[length:var(--heading-medium-font-size)] leading-[var(--heading-medium-line-height)] font-[number:var(--heading-medium-font-weight)] tracking-[var(--heading-medium-letter-spacing)] [font-style:var(--heading-medium-font-style)]">
            Hubungi kami
          </h2>

          <p className="self-stretch font-body font-[number:var(--body-font-weight)] text-[color:var(--body)] text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
            Jangan ragu untuk meminta konsultasi atau bertanya lansung saja
            hubungi kami
          </p>

          <div className="flex flex-col w-full gap-[30px]">
            <div className="flex flex-wrap gap-[30px] w-full">
              {formFields.slice(0, 2).map((field) => (
                <div
                  key={field.id}
                  className="flex flex-col gap-2.5 flex-1 min-w-[250px]"
                >
                  <label className="font-form-label font-[number:var(--form-label-font-weight)] text-heading text-[length:var(--form-label-font-size)] tracking-[var(--form-label-letter-spacing)] leading-[var(--form-label-line-height)] [font-style:var(--form-label-font-style)]">
                    {field.label}
                  </label>
                  <Input
                    placeholder={field.placeholder}
                    className="p-5 bg-[#f0f0f0] rounded-[30px] font-body-small font-[number:var(--body-small-font-weight)] text-[color:var(--body)] text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)]"
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-[30px] w-full">
              <div className="flex flex-col gap-2.5 flex-1 min-w-[250px]">
                <label className="font-form-label font-[number:var(--form-label-font-weight)] text-heading text-[length:var(--form-label-font-size)] tracking-[var(--form-label-letter-spacing)] leading-[var(--form-label-line-height)] [font-style:var(--form-label-font-style)]">
                  {formFields[2].label}
                </label>
                <Input
                  placeholder={formFields[2].placeholder}
                  className="p-5 bg-[#f0f0f0] rounded-[30px] font-body-small font-[number:var(--body-small-font-weight)] text-[color:var(--body)] text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)]"
                />
              </div>

              <div className="flex flex-col gap-2.5 flex-1 min-w-[250px]">
                <label className="font-form-label font-[number:var(--form-label-font-weight)] text-heading text-[length:var(--form-label-font-size)] tracking-[var(--form-label-letter-spacing)] leading-[var(--form-label-line-height)] [font-style:var(--form-label-font-style)]">
                  {formFields[3].label}
                </label>
                <Select>
                  <SelectTrigger className="p-5 bg-[#f0f0f0] rounded-[30px] font-body-small font-[number:var(--body-small-font-weight)] text-[color:var(--body)] text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)]">
                    <SelectValue placeholder={formFields[3].placeholder} />
                  </SelectTrigger>
                </Select>
              </div>
            </div>

            <div className="flex w-full">
              <div className="flex flex-col gap-2.5 w-full">
                <label className="font-form-label font-[number:var(--form-label-font-weight)] text-heading text-[length:var(--form-label-font-size)] tracking-[var(--form-label-letter-spacing)] leading-[var(--form-label-line-height)] [font-style:var(--form-label-font-style)]">
                  {formFields[4].label}
                </label>
                <Textarea
                  placeholder={formFields[4].placeholder}
                  className="p-5 min-h-[120px] bg-[#f0f0f0] rounded-[30px] font-body-small font-[number:var(--body-small-font-weight)] text-[color:var(--body)] text-[length:var(--body-small-font-size)] tracking-[var(--body-small-letter-spacing)] leading-[var(--body-small-line-height)] [font-style:var(--body-small-font-style)]"
                />
              </div>
            </div>

            <Button className="bg-app-primary px-10 py-5 rounded-[30px] w-fit">
              <span className="font-accent font-[number:var(--accent-font-weight)] text-[#f0f0f0] text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
                SEND MESSAGE
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col flex-1 gap-[30px] py-[60px] relative">
        <span className="font-accent font-[number:var(--accent-font-weight)] text-app-secondary text-[length:var(--accent-font-size)] tracking-[var(--accent-letter-spacing)] leading-[var(--accent-line-height)] [font-style:var(--accent-font-style)]">
          TETAP BERSAMA KAMI
        </span>

        <h2 className="font-heading-big text-heading text-[length:var(--heading-big-font-size)] leading-[var(--heading-big-line-height)] font-[number:var(--heading-big-font-weight)] tracking-[var(--heading-big-letter-spacing)] [font-style:var(--heading-big-font-style)]">
          Hubungi kami
        </h2>

        <p className="font-body font-[number:var(--body-font-weight)] text-[color:var(--body)] text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
          Jangan ragu untuk meminta konsultasi atau bertanya lansung saja
          hubungi kami
        </p>

        <img
          className="absolute w-[115px] h-[74px] top-[7px] right-0"
          alt="Dot smoke"
          src="/images/dot_smoke.svg"
        />

        {contactInfo.map((info, index) => (
          <div key={index} className="flex gap-5 w-full">
            {info.icon}
            <div className="flex flex-col gap-[7px] flex-1">
              <h3 className="font-heading-small font-[number:var(--heading-small-font-weight)] text-heading text-[length:var(--heading-small-font-size)] tracking-[var(--heading-small-letter-spacing)] leading-[var(--heading-small-line-height)] [font-style:var(--heading-small-font-style)]">
                {info.title}
              </h3>
              <p className="font-body font-[number:var(--body-font-weight)] text-[color:var(--body)] text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
                {info.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
