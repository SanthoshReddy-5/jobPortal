"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase, Building2, Calendar, Globe, Loader, MapPin } from 'lucide-react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { updateEmployerProfileAction } from '../employerActions';
import { toast } from 'sonner';
import { EmployerProfileData, employerProfileSchema, organizationTypeOptions, teamSizeOptions } from '../employerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import TiptapEditor from '@/components/TiptapEditor';

const EmployerSettingsForm = ({ initialData }: {
    initialData?: Partial<EmployerProfileData>;
}) => {

    const { register, handleSubmit, control, formState: { errors, isDirty, isSubmitting } } = useForm<EmployerProfileData>({
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
            organizationType: initialData?.organizationType || undefined,
            teamSize: initialData?.teamSize || undefined,
            yearOfEstablishment: initialData?.yearOfEstablishment,
            websiteUrl: initialData?.websiteUrl || "",
            location: initialData?.location || "",
        },
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
                        <Controller
                            name="description"
                            control={control}
                            render={({ field, fieldState }) => (
                                <div className="space-y-2">
                                    <Label>Description *</Label>
                                    <TiptapEditor content={field.value} onChange={field.onChange} />

                                    {fieldState.error && (
                                        <p className="text-sm text-destructive">
                                            {fieldState.error.message}
                                        </p>
                                    )}
                                </div>
                            )}
                        />
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

                    <div className='flex items-center gap-4 pt-4'>
                        <Button type="submit">
                            {isSubmitting && <Loader className="w-4 h-4 animate-spin" />}
                            {isSubmitting ? "Updating Profile..." : "Update Profile"}
                        </Button>
                        {!isDirty && <p className='text-sm text-muted-foreground'>No changes to Save</p>}
                    </div>
                </form>
            </CardContent>

        </Card>
    )
}

export default EmployerSettingsForm;