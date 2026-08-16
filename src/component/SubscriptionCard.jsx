const SubscriptionCard = ({ avatar, channelName, onUnsubscribe }) => (
  <article className="subscription-card">
    <div className="subscription-card__identity">
      <img src={avatar} alt="" loading="lazy" />
      <span>{channelName}</span>
    </div>
    <button type="button" className="bugsy-btn bugsy-btn--ghost bugsy-btn--compact" onClick={() => onUnsubscribe(channelName)}>Unsubscribe</button>
  </article>
);

export default SubscriptionCard;
