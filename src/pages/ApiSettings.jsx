
import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Settings, Key, Save } from "lucide-react";

const ApiSettings = () => {
  const [settings, setSettings] = useState({
    videoUploadEndpoint: "",
    videoStreamEndpoint: "",
    userAuthEndpoint: "",
    rateLimitPerMinute: "100",
    maxVideoSizeMB: "500"
  });

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = () => {
    console.log("Saving API settings:", settings);
    // Here you would typically save to localStorage or send to backend
    localStorage.setItem('apiSettings', JSON.stringify(settings));
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Settings className="h-8 w-8" />
              API Settings
            </h1>
            
            <Card className="bg-gray-800 border-gray-700 p-6">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Endpoints Configuration
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Video Upload Endpoint
                    </label>
                    <Input
                      type="url"
                      placeholder="/api/videos/upload"
                      value={settings.videoUploadEndpoint}
                      onChange={(e) => handleInputChange('videoUploadEndpoint', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Video Stream Endpoint
                    </label>
                    <Input
                      type="url"
                      placeholder="/api/videos/stream"
                      value={settings.videoStreamEndpoint}
                      onChange={(e) => handleInputChange('videoStreamEndpoint', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      User Authentication Endpoint
                    </label>
                    <Input
                      type="url"
                      placeholder="/api/auth"
                      value={settings.userAuthEndpoint}
                      onChange={(e) => handleInputChange('userAuthEndpoint', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Rate Limit (requests/minute)
                    </label>
                    <Input
                      type="number"
                      placeholder="100"
                      value={settings.rateLimitPerMinute}
                      onChange={(e) => handleInputChange('rateLimitPerMinute', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Max Video Size (MB)
                    </label>
                    <Input
                      type="number"
                      placeholder="500"
                      value={settings.maxVideoSizeMB}
                      onChange={(e) => handleInputChange('maxVideoSizeMB', e.target.value)}
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      onClick={handleSaveSettings}
                      className="bg-purple-600 hover:bg-purple-700 w-full"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Settings
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ApiSettings;
