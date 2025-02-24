from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.label import Label


class VotingApp(App):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.candidates = {"Alice": 0, "Bob": 0, "Charlie": 0}

    def build(self):
        layout = BoxLayout(orientation='vertical', spacing=10, padding=20)
        self.status_label = Label(text="Vote for your candidate!", size_hint_y=None, height=40)
        layout.add_widget(self.status_label)

        self.buttons = {}
        for candidate in self.candidates:
            btn = Button(text=f"{candidate} - {self.candidates[candidate]} votes", size_hint_y=None, height=50)
            btn.bind(on_press=self.vote)
            layout.add_widget(btn)
            self.buttons[candidate] = btn

        return layout

    def vote(self, instance):
        candidate = instance.text.split(' - ')[0]
        self.candidates[candidate] += 1
        instance.text = f"{candidate} - {self.candidates[candidate]} votes"
        self.status_label.text = f"You voted for {candidate}!"


if __name__ == '__main__':
    VotingApp().run()
