import SubscriptionCard from "../../component/SubscriptionCard";
import subscriptions from "../../context/SubscriptionData";

const Subscription = () => {
  const handleUnsubscribe = (channelName) => {
    alert(`Unsubscribed from ${channelName}`);
    // Remove from state if dynamic
  };

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Your Subscriptions</h1>
      {subscriptions.map((sub, index) => (
        <SubscriptionCard
          key={index}
          avatar={sub.avatar}
          channelName={sub.channelName}
          onUnsubscribe={handleUnsubscribe}
        />
      ))}
    </div>
  );
};

export default Subscription;
