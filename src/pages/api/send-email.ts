import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { from, to, subject, text, html } = req.body;

    const { data, error } = await supabase
      .from('emails')
      .insert([{
        from_email: from,
        to_email: to,
        subject,
        content: text,
        html_content: html,
        status: 'pending'
      }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: 'Database error' });
    }

    // Envoyer l'email via le SMTP Manager
    const smtpResponse = await fetch('/api/smtp/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailId: data[0].id,
        to,
        subject,
        text,
        html
      })
    });

    if (!smtpResponse.ok) {
      throw new Error('SMTP send failed');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}