'use client';

import { useState } from 'react';
import { Button } from './button';
import { MapPin, Loader2 } from 'lucide-react';

interface LocationData {
    city: string;
    country?: string;
}

export function LocationDetector() {
    const [location, setLocation] = useState<LocationData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const detectLocation = async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Check if geolocation is supported by the browser
            if (!navigator.geolocation) {
                throw new Error(
                    'Geolocation is not supported by your browser.'
                );
            }

            // Get the current position
            const position = await new Promise<GeolocationPosition>(
                (resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject, {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0,
                    });
                }
            );

            const { latitude, longitude } = position.coords;

            // Use reverse geocoding to get the city name
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );

            if (!response.ok) {
                throw new Error('Failed to fetch location data');
            }

            const data = await response.json();

            // Extract city and country from the response
            const city =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                data.address.hamlet ||
                'Unknown location';

            const country = data.address.country;

            setLocation({ city, country });
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to detect location'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex w-full flex-col items-center gap-3">
            <Button
                onClick={detectLocation}
                disabled={isLoading}
                variant="outline"
                className="w-full"
                size="sm"
            >
                {isLoading ? (
                    <>
                        <Loader2 className="animate-spin" />
                        <span>Detecting...</span>
                    </>
                ) : (
                    <>
                        <MapPin />
                        <span>Detect my location</span>
                    </>
                )}
            </Button>

            {error && (
                <p className="text-destructive text-center text-xs">{error}</p>
            )}

            {location && !error && (
                <div className="mt-1 text-center">
                    <p className="font-medium">{location.city}</p>
                    {location.country && (
                        <p className="text-muted-foreground text-xs">
                            {location.country}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
}
