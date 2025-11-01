import { useEffect, useRef, useState } from "react";
import { MessageIcon, SendIcon } from "../../icons/FooterIcons";
import AlertMessage from "../../ui/AlertMessage";
import { sendOutboundMail, resetOutboundMailById } from "../../../redux/slices/createEmailSlice";
import type { RootState } from "../../../redux/store";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { composeNewsletterEmail } from "../../../utlis/teamAndNewsletter";

export function FooterNewsletter() {
  const dispatch = useAppDispatch();
  const CHANNEL_ID = "newsletter";

  const channel = useAppSelector((s: RootState) => s.outboundMailer.byId[CHANNEL_ID]);
  const sending = channel?.sending ?? false;
  const success = channel?.success ?? false;
  const remoteError = channel?.error ?? "";

  const [showAlert, setShowAlert] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (success) {
      setShowAlert(true);
      formRef.current?.reset();
      setEmail("");
      dispatch(resetOutboundMailById({ cardId: CHANNEL_ID }));
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (remoteError) setError(remoteError);
  }, [remoteError]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");

    const { subject, message } = composeNewsletterEmail({
      subscriberEmail: email,
      siteName: "Estatein",
      note: "User subscribed via footer form.",
    });

    dispatch(
      sendOutboundMail({
        cardId: CHANNEL_ID,
        subject,
        from_name: "FooterNewsletter",
        message,
        to_email: email,     
        reply_to: email,     
        extra: { subscriber_email: email },
      })
    );
  };

  return (
    <>
      {showAlert && (
        <AlertMessage
          message="We've got your email! 📬 We'll be in touch soon"
          onClose={() => setShowAlert(false)}
        />
      )}

      <form
        ref={formRef}
        onSubmit={onSubmit}
        className="space-y-2 w-full lg-custom:w-[305px] 2xl:w-[423px] border border-gray15 rounded-xl "
      >
        <div className="relative group">
          <MessageIcon className="absolute left-5 top-1/2 size-4 -translate-y-1/2 stroke-gray-light" />
          <input
            type="email"
            name="subscriber_email"
            placeholder="Enter Your Email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-10 py-3.5 rounded-xl"
            aria-invalid={!!error}
            aria-describedby={error ? "newsletter-error" : undefined}
          />
          {error && (
            <span id="newsletter-error" className="absolute -bottom-5 left-2 text-xs text-red-500">
              {error}
            </span>
          )}
          <button
            type="submit"
            disabled={sending}
            className="absolute right-1 top-1/2 size-10 -translate-y-1/2 cursor-pointer disabled:opacity-60"
            aria-busy={sending}
            title="Subscribe"
          >
            <SendIcon className="group-focus-within:fill-purple70" />
          </button>
        </div>
      </form>
    </>
  );
}
