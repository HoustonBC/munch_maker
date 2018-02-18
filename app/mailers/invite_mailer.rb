class InviteMailer < ApplicationMailer
  def new_invite(event, recipient, sender)
    @recipient = recipient
    @event = event
    @sender = sender

    mail(
      to: recipient,
      subject: "new invite from #{sender}"
    )
  end
end
