import * as React from "react"
import { View } from "react-native"
import Sugar from "./Sugar"

export const ProviderView = ({
    sugar,
    children
}: {
    sugar: Sugar<any>
    children: React.ReactNode | React.ReactNode[]
}) => {
    const [count, render] = React.useState(1)

    React.useEffect(() => {
        sugar.subscribe("build", () => {
            render(c => c + 1)
        })
    }, [])

    return (
        <View key={count} style={{ flex: 1 }}>
            {children}
        </View>
    )
}
