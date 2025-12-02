"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Briefcase, Building2, Calendar, FileText, Globe, MapPin } from 'lucide-react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { updateEmployerProfileAction } from '../employerActions';
import { toast } from 'sonner';
import { EmployerProfileData, employerProfileSchema, organizationTypeOptions, teamSizeOptions } from '../employerSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const EmployerSettingsForm = () => {

    const { register, handleSubmit, control, formState: { errors } } = useForm<EmployerProfileData>({
        resolver: zodResolver(employerProfileSchema)
    });

    const handleFormSubmit = async (data: EmployerProfileData) => {
        const response = await updateEmployerProfileAction(data);

        if (response.status === "SUCCESS") {
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
    };

    return (
        <Card className='w-3/4'>
            <CardContent>
                <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6'>
                    <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name *</Label>
                        <div className="relative">
                            <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="companyName"
                                type="text"
                                placeholder="Enter company name"
                                className={`pl-10 ${errors.name ? "border-destructive" : ""} `}
                                {...register("name")}
                            />
                        </div>
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name.message}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Company Description *</Label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                            <Textarea
                                id="description"
                                placeholder="Tell us about your company, what you do, and your mission..."
                                className={`pl-10 min-h-[120px] resize-none ${errors.description ? "border-destructive" : ""} `}
                                {...register("description")}
                            />
                        </div>
                        {errors.description && (
                            <p className="text-sm text-destructive">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="organizationType">Organization Type *</Label>
                            <Controller
                                name="organizationType"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className={`pl-10 w-full ${errors.organizationType ? "border-destructive" : ""} `}>
                                                <SelectValue placeholder="Select organization type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {organizationTypeOptions.map((type) => (
                                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            />
                            {errors.organizationType && (
                                <p className="text-sm text-destructive">
                                    {errors.organizationType.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="teamSize">Team Size *</Label>
                            <Controller
                                name="teamSize"
                                control={control}
                                render={({ field }) => (
                                    <div className="relative">
                                        <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                                        <Select value={field.value} onValueChange={field.onChange}>
                                            <SelectTrigger className={`pl-10 w-full ${errors.teamSize ? "border-destructive" : ""} `}>
                                                <SelectValue placeholder="Select Team Size" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {teamSizeOptions.map((type) => (
                                                    <SelectItem key={type} value={type}>{type}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            />
                            {errors.teamSize && (
                                <p className="text-sm text-destructive">
                                    {errors.teamSize.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="yearOfEstablishment">
                                Year of Establishment *
                            </Label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="yearOfEstablishment"
                                    type="text"
                                    placeholder="e.g., 2025"
                                    maxLength={4}
                                    className={`pl-10 ${errors.yearOfEstablishment ? "border-destructive" : ""} `}
                                    {...register("yearOfEstablishment")}
                                />
                            </div>
                            {errors.yearOfEstablishment && (
                                <p className="text-sm text-destructive">
                                    {errors.yearOfEstablishment.message}
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Location *</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    id="location"
                                    type="text"
                                    placeholder="e.g., Hyderabad, Bangalore"
                                    className={`pl-10 ${errors.location ? "border-destructive" : ""} `}
                                    {...register("location")}
                                />
                            </div>
                            {errors.location && (
                                <p className="text-sm text-destructive">
                                    {errors.location.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="websiteUrl">Website URL (Optional)</Label>
                        <div className="relative">
                            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                id="websiteUrl"
                                type="text"
                                placeholder="https://www.yourcompany.com"
                                className={`pl-10 ${errors.websiteUrl ? "border-destructive" : ""} `}
                                {...register("websiteUrl")}
                            />
                        </div>
                        {errors.websiteUrl && (<p className="text-sm text-destructive">{errors.websiteUrl.message}</p>)}
                    </div>

                    <Button type="submit">Update Profile</Button>
                </form>
            </CardContent>

        </Card>
    )
}

export default EmployerSettingsForm;