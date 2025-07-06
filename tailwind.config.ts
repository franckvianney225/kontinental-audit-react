import type { Config } from "tailwindcss";

export default {
	darkMode: "class",
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				fadeInUp: {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				bounce: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				rotateY: {
					'0%': { transform: 'perspective(1000px) rotateY(90deg)', opacity: '0' },
					'100%': { transform: 'perspective(1000px) rotateY(0deg)', opacity: '1' }
				},
				rotateYReverse: {
					'0%': { transform: 'perspective(1000px) rotateY(-90deg)', opacity: '0' },
					'100%': { transform: 'perspective(1000px) rotateY(0deg)', opacity: '1' }
				},
				cascadeIn: {
					'0%': { transform: 'translateY(100%) scale(0.8)', opacity: '0' },
					'100%': { transform: 'translateY(0) scale(1)', opacity: '1' }
				},
				cascadeOut: {
					'0%': { transform: 'translateY(0) scale(1)', opacity: '1' },
					'100%': { transform: 'translateY(-100%) scale(0.8)', opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
				'bounce': 'bounce 2s infinite',
				'rotate-y': 'rotateY 0.8s ease-in-out forwards',
				'rotate-y-reverse': 'rotateYReverse 0.8s ease-in-out forwards',
				'cascade-in': 'cascadeIn 0.7s ease-out forwards',
				'cascade-out': 'cascadeOut 0.7s ease-out forwards'
			},
			textShadow: {
				'lg': '0 2px 4px rgba(0, 0, 0, 0.5)',
				'none': 'none'
			}
		}
	},
	plugins: [
		// Solution alternative sans require()
		async () => {
			const animatePlugin = await import("tailwindcss-animate");
			return animatePlugin.default;
		},
		({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) => {
			addUtilities({
				'.text-shadow': {
					'text-shadow': '0 2px 4px rgba(0, 0, 0, 0.5)',
				},
				'.text-shadow-lg': {
					'text-shadow': '0 4px 8px rgba(0, 0, 0, 0.5)',
				},
				'.text-shadow-none': {
					'text-shadow': 'none',
				},
			})
		}
	],
} satisfies Config;
