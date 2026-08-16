import { useState } from "react";
import SubscriptionCard from "../../component/SubscriptionCard";
import subscriptions from "../../context/SubscriptionData";

const Subscription = () => {
  const [channels, setChannels] = useState(subscriptions);
  const unsubscribe = (channelName) => setChannels((items) => items.filter((channel) => channel.channelName !== channelName));

  return <section className="subscription-page"><header className="category-page__header"><div><span className="bugsy-eyebrow">Your library</span><h1 className="bugsy-page-title">Subscriptions</h1><p className="bugsy-page-subtitle">Channels you follow and their newest videos.</p></div></header>{channels.length ? <div className="subscription-list">{channels.map((channel, index) => <SubscriptionCard key={`${channel.channelName}-${index}`} {...channel} onUnsubscribe={unsubscribe} />)}</div> : <div className="bugsy-empty-state"><h2>No subscriptions yet</h2><p>Follow channels to build a more personal home feed.</p></div>}</section>;
};

export default Subscription;
