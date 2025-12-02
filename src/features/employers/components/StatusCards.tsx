import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Users } from "lucide-react";

export function StatusCards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-foreground">589</p>
              <p className="text-sm text-muted-foreground">Open Jobs</p>
            </div>
            <div className="p-3 bg-black rounded-lg">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-foreground">2,517</p>
              <p className="text-sm text-muted-foreground">Saved Candidates</p>
            </div>
            <div className="p-3 bg-black rounded-lg">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}