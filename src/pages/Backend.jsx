
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Database, Server, Wifi, WifiOff } from "lucide-react";

const Backend = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleConnect = () => {
    if (apiUrl && apiKey) {
      setIsConnected(true);
      console.log("Backend connected:", { apiUrl, apiKey });
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setApiUrl("");
    setApiKey("");
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Database className="h-8 w-8" />
              Backend Configuration
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    API Connection
                  </h2>
                  <div className="flex items-center gap-2">
                    {isConnected ? (
                      <Wifi className="h-5 w-5 text-green-500" />
                    ) : (
                      <WifiOff className="h-5 w-5 text-red-500" />
                    )}
                    <span className={`text-sm ${isConnected ? 'text-green-500' : 'text-red-500'}`}>
                      {isConnected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      API Base URL
                    </label>
                    <Input
                      type="url"
                      placeholder="https://api.yourbackend.com"
                      value={apiUrl}
                      onChange={(e) => setApiUrl(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      disabled={isConnected}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      API Key
                    </label>
                    <Input
                      type="password"
                      placeholder="Enter your API key"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                      disabled={isConnected}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    {!isConnected ? (
                      <Button 
                        onClick={handleConnect}
                        className="bg-green-600 hover:bg-green-700"
                        disabled={!apiUrl || !apiKey}
                      >
                        Connect Backend
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleDisconnect}
                        variant="destructive"
                      >
                        Disconnect
                      </Button>
                    )}
                  </div>
                </div>
              </Card>

              <Card className="bg-gray-800 border-gray-700 p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Connection Status</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Database</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      isConnected ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
                    }`}>
                      {isConnected ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Video Storage</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      isConnected ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
                    }`}>
                      {isConnected ? 'Connected' : 'Disconnected'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Authentication</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      isConnected ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
                    }`}>
                      {isConnected ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Backend;
