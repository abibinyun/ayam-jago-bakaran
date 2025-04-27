"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

export default function SettingsPage() {
  const router = useRouter()
  const supabase = createClientSupabaseClient()
  const [isLoading, setIsLoading] = React.useState<boolean>(true)
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [settings, setSettings] = React.useState({
    id: "",
    site_name: "",
    logo_url: "",
    favicon_url: "",
    phone: "",
    email: "",
    address: "",
    instagram_url: "",
    facebook_url: "",
    whatsapp_number: "",
    footer_text: "",
  })

  React.useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase.from("site_settings").select("*").single()

        if (error) throw error

        if (data) {
          setSettings(data)
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.message || "Failed to fetch settings",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchSettings()
  }, [supabase])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const { error } = await supabase
        .from("site_settings")
        .update({
          site_name: settings.site_name,
          logo_url: settings.logo_url,
          favicon_url: settings.favicon_url,
          phone: settings.phone,
          email: settings.email,
          address: settings.address,
          instagram_url: settings.instagram_url,
          facebook_url: settings.facebook_url,
          whatsapp_number: settings.whatsapp_number,
          footer_text: settings.footer_text,
          updated_at: new Date().toISOString(),
        })
        .eq("id", settings.id)

      if (error) throw error

      toast({
        title: "Settings saved",
        description: "Your site settings have been updated successfully.",
      })

      router.refresh()
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save settings",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Site Settings</h2>
        </div>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Loading...</CardTitle>
              <CardDescription>Please wait while we load your settings.</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Site Settings</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Basic information about your restaurant.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="site_name">Site Name</Label>
                <Input
                  id="site_name"
                  name="site_name"
                  value={settings.site_name}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="logo_url">Logo URL</Label>
                <Input
                  id="logo_url"
                  name="logo_url"
                  value={settings.logo_url || ""}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="favicon_url">Favicon URL</Label>
                <Input
                  id="favicon_url"
                  name="favicon_url"
                  value={settings.favicon_url || ""}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Contact details for your restaurant.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={settings.phone || ""}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={settings.email || ""}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={settings.address || ""}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social Media</CardTitle>
              <CardDescription>Social media links for your restaurant.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="instagram_url">Instagram URL</Label>
                <Input
                  id="instagram_url"
                  name="instagram_url"
                  value={settings.instagram_url || ""}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook_url">Facebook URL</Label>
                <Input
                  id="facebook_url"
                  name="facebook_url"
                  value={settings.facebook_url || ""}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
                <Input
                  id="whatsapp_number"
                  name="whatsapp_number"
                  value={settings.whatsapp_number || ""}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Footer</CardTitle>
              <CardDescription>Footer text for your website.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="footer_text">Footer Text</Label>
                <Textarea
                  id="footer_text"
                  name="footer_text"
                  value={settings.footer_text || ""}
                  onChange={handleChange}
                  disabled={isSaving}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}
