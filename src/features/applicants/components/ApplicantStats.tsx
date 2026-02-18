import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Bookmark, Bell } from "lucide-react";

export const ApplicantStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">589</p>
            <p className="text-sm font-medium text-gray-500">Applied jobs</p>
          </div>
          <div className="p-3 bg-black rounded-lg shadow-sm">
            <Briefcase className="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">238</p>
            <p className="text-sm font-medium text-gray-500">Favorite jobs</p>
          </div>
          <div className="p-3 bg-black rounded-lg shadow-sm">
            <Bookmark className="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">574</p>
            <p className="text-sm font-medium text-gray-500">Job Alerts</p>
          </div>
          <div className="p-3 bg-black rounded-lg shadow-sm">
            <Bell className="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};