import { Control, UseFormWatch } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { PlusIcon, XIcon, ShieldIcon } from "lucide-react";
import { ListingFormData } from "@/lib/types";
import { useState } from "react";

interface RulesStepProps {
  control: Control<ListingFormData>;
  watch: UseFormWatch<ListingFormData>;
  setValue: (name: keyof ListingFormData, value: any) => void;
}

export const RulesStep = ({ control, watch, setValue }: RulesStepProps) => {
  const [newRule, setNewRule] = useState("");
  const watchedRules = watch("rules") || [];

  const commonRules = [
    "No smoking",
    "No pets",
    "No parties or events",
    "No loud music after 10 PM",
    "No unregistered guests",
    "Must remove shoes inside",
    "Quiet hours after 10 PM",
    "No food in bedrooms",
    "Check-in after 3 PM",
    "Check-out before 11 AM",
  ];

  const addRule = (rule: string) => {
    if (rule && !watchedRules.includes(rule)) {
      setValue("rules", [...watchedRules, rule]);
    }
  };

  const removeRule = (ruleToRemove: string) => {
    setValue(
      "rules",
      watchedRules.filter((rule) => rule !== ruleToRemove),
    );
  };

  const toggleRule = (rule: string) => {
    const isSelected = watchedRules.includes(rule);
    if (isSelected) {
      removeRule(rule);
    } else {
      addRule(rule);
    }
  };

  const addCustomRule = () => {
    if (newRule.trim() && !watchedRules.includes(newRule.trim())) {
      addRule(newRule.trim());
      setNewRule("");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldIcon className="h-5 w-5" />
            House Rules
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Set clear expectations for your guests to ensure a great experience
            for everyone.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Common Rules */}
          <div>
            <h3 className="font-semibold mb-3">Common House Rules</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {commonRules.map((rule) => {
                const isSelected = watchedRules.includes(rule);
                return (
                  <div
                    key={rule}
                    className={`
                      flex items-center gap-3 p-3 border rounded-lg transition-all
                      ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }
                    `}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleRule(rule)}
                    />
                    <Label
                      className="cursor-pointer flex-1 text-sm"
                      onClick={() => toggleRule(rule)}
                    >
                      {rule}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Custom Rules */}
          <div>
            <h3 className="font-semibold mb-3">Add Custom Rule</h3>
            <div className="flex gap-2">
              <Input
                value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                placeholder="Enter a custom house rule..."
                onKeyPress={(e) => e.key === "Enter" && addCustomRule()}
              />
              <Button
                onClick={addCustomRule}
                disabled={
                  !newRule.trim() || watchedRules.includes(newRule.trim())
                }
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Selected Rules Summary */}
          {watchedRules.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Your House Rules</h3>
                <Badge variant="secondary">{watchedRules.length} rules</Badge>
              </div>

              <div className="space-y-2">
                {watchedRules.map((rule, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm flex-1">{rule}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeRule(rule)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rules Guidelines */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">
              Guidelines for House Rules
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Keep rules reasonable and enforceable</li>
              <li>• Be specific about quiet hours and party policies</li>
              <li>• Mention any restrictions on smoking, pets, or guests</li>
              <li>• Include check-in/check-out procedures if needed</li>
              <li>• Consider local noise ordinances and building rules</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="checkInInstructions">Check-in Instructions</Label>
              <Input
                id="checkInInstructions"
                placeholder="e.g., Self check-in with keypad"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="wifiPassword">WiFi Password</Label>
              <Input
                id="wifiPassword"
                placeholder="Enter WiFi password"
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="specialInstructions">Special Instructions</Label>
            <Input
              id="specialInstructions"
              placeholder="Any special instructions for guests..."
              className="mt-1"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
