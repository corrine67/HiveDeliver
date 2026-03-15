import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import Chatbot from '../components/Chatbot.jsx'
import PageHeader from '../components/PageHeader.jsx'

function SupportChatbotPage() {
  const { t } = useTranslation()

  return (
    <Stack spacing={2.5}>
      <Box className="reveal-up">
        <PageHeader
          title={t('support.pageTitle')}
          subtitle={t('support.pageSubtitle')}
        />
      </Box>

      <Box className="reveal-up delay-1">
        <Card className="hover-lift glow-card" sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: { xs: 2.2, md: 2.8 } }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.8, lineHeight: 1.7 }}>
              {t('support.description')}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}>
              <Chatbot />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  )
}

export default SupportChatbotPage
