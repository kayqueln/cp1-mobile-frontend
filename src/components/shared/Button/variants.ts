import Colors from "@/src/constants/Colors"

export type ButtonVariantsTyping = 'outline'

export const getButtonVariant = (variant?: ButtonVariantsTyping) => {
  let styles

  switch (variant) {
    case 'outline':
      styles = {
        container: {
          borderWidth: 1,
          backgroundColor: 'transparent',
          borderColor: Colors.primary,
        },

        fontColor: Colors.primary,
      }
      break
    default:
      styles = {
        container: {
          backgroundColor: Colors.primary,
        },

        fontColor: '#fff',
      }
      break
  }

  return styles
}
